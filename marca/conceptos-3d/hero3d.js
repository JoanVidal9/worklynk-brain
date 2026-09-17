/* WORKLYNK — fondo 3D del hero: simulación de fluido en WebGL puro (sin
   librerías: ni Three.js ni ninguna otra). Tinta verde de marca que se
   arremolina sola (un cursor invisible orbita el centro para siempre) y
   que además reacciona al ratón real. Mejora progresiva: si no hay WebGL,
   es móvil o se pidió menos movimiento, el hero se queda con su titular
   sobre el fondo de puntos en CSS. Nunca bloquea el primer pintado.

   Motor original: WebGL Fluid Simulation de Pavel Dobryakov (MIT). Aquí:
   sin dependencias externas, paleta de marca por tema (oscuro/claro),
   pausa cuando el hero sale de pantalla o la pestaña queda oculta. */
(function () {
  var raiz = document.querySelector("[data-hero-net]");
  if (!raiz) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.innerWidth < 761) return; // en móvil pesa más de lo que aporta
  if (!window.WebGLRenderingContext) return;

  function esOscuro() {
    return (document.documentElement.getAttribute("data-theme") || "dark") !== "light";
  }

  function iniciar() {
    var w = raiz.clientWidth, h = raiz.clientHeight;
    if ((!w || !h) && raiz.parentElement) {
      w = raiz.parentElement.clientWidth;
      h = raiz.parentElement.clientHeight;
    }
    if (!w || !h) return;

    var canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    raiz.appendChild(canvas);

    try {
      arrancarFluido(canvas);
    } catch (e) {
      // Cualquier fallo de WebGL en tiempo real (contexto perdido, GPU rara,
      // etc.): se quita el canvas y se queda el fondo de puntos de siempre.
      raiz.removeChild(canvas);
    }
  }

  function arrancarFluido(canvas) {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Paleta por tema: en oscuro la tinta brilla sobre casi negro. El
    // compositing del motor siempre suma luz sobre el fondo (no la resta),
    // así que en claro no hay "tinta oscura" literal -- se compensa con
    // menos valor y menos saturación para que quede discreta sobre blanco
    // en vez de un charco de acuarela saturada.
    function paleta() {
      return esOscuro()
        ? { fondo: { r: 8, g: 8, b: 10 }, sat: 0.92, val: 1.0 }
        : { fondo: { r: 251, g: 251, b: 253 }, sat: 0.8, val: 0.32 };
    }

    var config = {
      SIM_RESOLUTION: 200,
      DYE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 0.94,
      VELOCITY_DISSIPATION: 0.96,
      PRESSURE_DISSIPATION: 0.8,
      PRESSURE_ITERATIONS: 20,
      CURL: 42,
      SPLAT_RADIUS: 0.16,
      SHADING: true,
      COLORFUL: true,
      PAUSED: false,
      BACK_COLOR: paleta().fondo,
      TRANSPARENT: false,
    };

    function pointerPrototype() {
      this.id = -1; this.x = 0; this.y = 0; this.dx = 0; this.dy = 0;
      this.down = false; this.moved = false; this.color = [30, 0, 300];
    }
    var pointers = [], splatStack = [];
    pointers.push(new pointerPrototype());

    var ctxInfo = getWebGLContext(canvas);
    var gl = ctxInfo.gl, ext = ctxInfo.ext;
    if (!gl) throw new Error("sin contexto WebGL");
    if (isMobile()) config.SHADING = false;
    if (!ext.supportLinearFiltering) config.SHADING = false;

    function getWebGLContext(canvas) {
      var params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
      var gl = canvas.getContext("webgl2", params);
      var isWebGL2 = !!gl;
      if (!isWebGL2) gl = canvas.getContext("webgl", params) || canvas.getContext("experimental-webgl", params);
      if (!gl) return { gl: null, ext: {} };

      var halfFloat, supportLinearFiltering;
      if (isWebGL2) {
        gl.getExtension("EXT_color_buffer_float");
        supportLinearFiltering = gl.getExtension("OES_texture_float_linear");
      } else {
        halfFloat = gl.getExtension("OES_texture_half_float");
        supportLinearFiltering = gl.getExtension("OES_texture_half_float_linear");
      }
      gl.clearColor(0, 0, 0, 1);
      var halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : (halfFloat && halfFloat.HALF_FLOAT_OES);
      var formatRGBA, formatRG, formatR;
      if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType);
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType);
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType);
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType);
        formatRG = formatRGBA;
        formatR = formatRGBA;
      }
      return { gl: gl, ext: { formatRGBA: formatRGBA, formatRG: formatRG, formatR: formatR, halfFloatTexType: halfFloatTexType, supportLinearFiltering: supportLinearFiltering } };
    }

    function getSupportedFormat(gl, internalFormat, format, type) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        if (internalFormat === gl.R16F) return getSupportedFormat(gl, gl.RG16F, gl.RG, type);
        if (internalFormat === gl.RG16F) return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type);
        return null;
      }
      return { internalFormat: internalFormat, format: format };
    }

    function supportRenderTextureFormat(gl, internalFormat, format, type) {
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null);
      var fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      return gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    }

    function isMobile() { return /Mobi|Android/i.test(navigator.userAgent); }

    function GLProgram(vertexShader, fragmentShader) {
      this.uniforms = {};
      this.program = gl.createProgram();
      gl.attachShader(this.program, vertexShader);
      gl.attachShader(this.program, fragmentShader);
      gl.linkProgram(this.program);
      if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) throw gl.getProgramInfoLog(this.program);
      var n = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
      for (var i = 0; i < n; i++) {
        var nm = gl.getActiveUniform(this.program, i).name;
        this.uniforms[nm] = gl.getUniformLocation(this.program, nm);
      }
    }
    GLProgram.prototype.bind = function () { gl.useProgram(this.program); };

    function compileShader(type, source) {
      var s = gl.createShader(type);
      gl.shaderSource(s, source);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw gl.getShaderInfoLog(s);
      return s;
    }

    var baseVertexShader = compileShader(gl.VERTEX_SHADER,
      "precision highp float;attribute vec2 aPosition;varying vec2 vUv;varying vec2 vL;varying vec2 vR;varying vec2 vT;varying vec2 vB;uniform vec2 texelSize;" +
      "void main(){vUv=aPosition*0.5+0.5;vL=vUv-vec2(texelSize.x,0.0);vR=vUv+vec2(texelSize.x,0.0);vT=vUv+vec2(0.0,texelSize.y);vB=vUv-vec2(0.0,texelSize.y);gl_Position=vec4(aPosition,0.0,1.0);}");
    var clearShader = compileShader(gl.FRAGMENT_SHADER,
      "precision mediump float;precision mediump sampler2D;varying highp vec2 vUv;uniform sampler2D uTexture;uniform float value;" +
      "void main(){gl_FragColor=value*texture2D(uTexture,vUv);}");
    var colorShader = compileShader(gl.FRAGMENT_SHADER,
      "precision mediump float;uniform vec4 color;void main(){gl_FragColor=color;}");
    var displayShader = compileShader(gl.FRAGMENT_SHADER,
      "precision highp float;precision highp sampler2D;varying vec2 vUv;uniform sampler2D uTexture;" +
      "void main(){vec3 C=texture2D(uTexture,vUv).rgb;float a=max(C.r,max(C.g,C.b));gl_FragColor=vec4(C,a);}");
    var displayShadingShader = compileShader(gl.FRAGMENT_SHADER,
      "precision highp float;precision highp sampler2D;varying vec2 vUv;varying vec2 vL;varying vec2 vR;varying vec2 vT;varying vec2 vB;uniform sampler2D uTexture;uniform vec2 texelSize;" +
      "void main(){vec3 L=texture2D(uTexture,vL).rgb;vec3 R=texture2D(uTexture,vR).rgb;vec3 T=texture2D(uTexture,vT).rgb;vec3 B=texture2D(uTexture,vB).rgb;vec3 C=texture2D(uTexture,vUv).rgb;" +
      "float dx=length(R)-length(L);float dy=length(T)-length(B);vec3 n=normalize(vec3(dx,dy,length(texelSize)));vec3 l=vec3(0.0,0.0,1.0);float diffuse=clamp(dot(n,l)+0.7,0.7,1.0);C.rgb*=diffuse;" +
      "float a=max(C.r,max(C.g,C.b));gl_FragColor=vec4(C,a);}");
    var splatShader = compileShader(gl.FRAGMENT_SHADER,
      "precision highp float;precision highp sampler2D;varying vec2 vUv;uniform sampler2D uTarget;uniform float aspectRatio;uniform vec3 color;uniform vec2 point;uniform float radius;" +
      "void main(){vec2 p=vUv-point.xy;p.x*=aspectRatio;vec3 splat=exp(-dot(p,p)/radius)*color;vec3 base=texture2D(uTarget,vUv).xyz;gl_FragColor=vec4(base+splat,1.0);}");
    var advectionManualFilteringShader = compileShader(gl.FRAGMENT_SHADER,
      "precision highp float;precision highp sampler2D;varying vec2 vUv;uniform sampler2D uVelocity;uniform sampler2D uSource;uniform vec2 texelSize;uniform vec2 dyeTexelSize;uniform float dt;uniform float dissipation;" +
      "vec4 bilerp(sampler2D sam,vec2 uv,vec2 tsize){vec2 st=uv/tsize-0.5;vec2 iuv=floor(st);vec2 fuv=fract(st);vec4 a=texture2D(sam,(iuv+vec2(0.5,0.5))*tsize);vec4 b=texture2D(sam,(iuv+vec2(1.5,0.5))*tsize);vec4 c=texture2D(sam,(iuv+vec2(0.5,1.5))*tsize);vec4 d=texture2D(sam,(iuv+vec2(1.5,1.5))*tsize);return mix(mix(a,b,fuv.x),mix(c,d,fuv.x),fuv.y);}" +
      "void main(){vec2 coord=vUv-dt*bilerp(uVelocity,vUv,texelSize).xy*texelSize;gl_FragColor=dissipation*bilerp(uSource,coord,dyeTexelSize);gl_FragColor.a=1.0;}");
    var advectionShader = compileShader(gl.FRAGMENT_SHADER,
      "precision highp float;precision highp sampler2D;varying vec2 vUv;uniform sampler2D uVelocity;uniform sampler2D uSource;uniform vec2 texelSize;uniform float dt;uniform float dissipation;" +
      "void main(){vec2 coord=vUv-dt*texture2D(uVelocity,vUv).xy*texelSize;gl_FragColor=dissipation*texture2D(uSource,coord);gl_FragColor.a=1.0;}");
    var divergenceShader = compileShader(gl.FRAGMENT_SHADER,
      "precision mediump float;precision mediump sampler2D;varying highp vec2 vUv;varying highp vec2 vL;varying highp vec2 vR;varying highp vec2 vT;varying highp vec2 vB;uniform sampler2D uVelocity;" +
      "void main(){float L=texture2D(uVelocity,vL).x;float R=texture2D(uVelocity,vR).x;float T=texture2D(uVelocity,vT).y;float B=texture2D(uVelocity,vB).y;vec2 C=texture2D(uVelocity,vUv).xy;" +
      "if(vL.x<0.0){L=-C.x;}if(vR.x>1.0){R=-C.x;}if(vT.y>1.0){T=-C.y;}if(vB.y<0.0){B=-C.y;}float div=0.5*(R-L+T-B);gl_FragColor=vec4(div,0.0,0.0,1.0);}");
    var curlShader = compileShader(gl.FRAGMENT_SHADER,
      "precision mediump float;precision mediump sampler2D;varying highp vec2 vUv;varying highp vec2 vL;varying highp vec2 vR;varying highp vec2 vT;varying highp vec2 vB;uniform sampler2D uVelocity;" +
      "void main(){float L=texture2D(uVelocity,vL).y;float R=texture2D(uVelocity,vR).y;float T=texture2D(uVelocity,vT).x;float B=texture2D(uVelocity,vB).x;float vorticity=R-L-T+B;gl_FragColor=vec4(0.5*vorticity,0.0,0.0,1.0);}");
    var vorticityShader = compileShader(gl.FRAGMENT_SHADER,
      "precision highp float;precision highp sampler2D;varying vec2 vUv;varying vec2 vL;varying vec2 vR;varying vec2 vT;varying vec2 vB;uniform sampler2D uVelocity;uniform sampler2D uCurl;uniform float curl;uniform float dt;" +
      "void main(){float L=texture2D(uCurl,vL).x;float R=texture2D(uCurl,vR).x;float T=texture2D(uCurl,vT).x;float B=texture2D(uCurl,vB).x;float C=texture2D(uCurl,vUv).x;" +
      "vec2 force=0.5*vec2(abs(T)-abs(B),abs(R)-abs(L));force/=length(force)+0.0001;force*=curl*C;force.y*=-1.0;vec2 vel=texture2D(uVelocity,vUv).xy;gl_FragColor=vec4(vel+force*dt,0.0,1.0);}");
    var pressureShader = compileShader(gl.FRAGMENT_SHADER,
      "precision mediump float;precision mediump sampler2D;varying highp vec2 vUv;varying highp vec2 vL;varying highp vec2 vR;varying highp vec2 vT;varying highp vec2 vB;uniform sampler2D uPressure;uniform sampler2D uDivergence;" +
      "void main(){float L=texture2D(uPressure,vL).x;float R=texture2D(uPressure,vR).x;float T=texture2D(uPressure,vT).x;float B=texture2D(uPressure,vB).x;float C=texture2D(uPressure,vUv).x;float divergence=texture2D(uDivergence,vUv).x;" +
      "float pressure=(L+R+B+T-divergence)*0.25;gl_FragColor=vec4(pressure,0.0,0.0,1.0);}");
    var gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER,
      "precision mediump float;precision mediump sampler2D;varying highp vec2 vUv;varying highp vec2 vL;varying highp vec2 vR;varying highp vec2 vT;varying highp vec2 vB;uniform sampler2D uPressure;uniform sampler2D uVelocity;" +
      "void main(){float L=texture2D(uPressure,vL).x;float R=texture2D(uPressure,vR).x;float T=texture2D(uPressure,vT).x;float B=texture2D(uPressure,vB).x;vec2 velocity=texture2D(uVelocity,vUv).xy;velocity.xy-=vec2(R-L,T-B);gl_FragColor=vec4(velocity,0.0,1.0);}");

    var blit = (function () {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(0);
      return function (destination) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
      };
    })();

    var simWidth, simHeight, dyeWidth, dyeHeight, density, velocity, divergence, curl, pressure;

    var clearProgram = new GLProgram(baseVertexShader, clearShader);
    var colorProgram = new GLProgram(baseVertexShader, colorShader);
    var displayProgram = new GLProgram(baseVertexShader, displayShader);
    var displayShadingProgram = new GLProgram(baseVertexShader, displayShadingShader);
    var splatProgram = new GLProgram(baseVertexShader, splatShader);
    var advectionProgram = new GLProgram(baseVertexShader, ext.supportLinearFiltering ? advectionShader : advectionManualFilteringShader);
    var divergenceProgram = new GLProgram(baseVertexShader, divergenceShader);
    var curlProgram = new GLProgram(baseVertexShader, curlShader);
    var vorticityProgram = new GLProgram(baseVertexShader, vorticityShader);
    var pressureProgram = new GLProgram(baseVertexShader, pressureShader);
    var gradienSubtractProgram = new GLProgram(baseVertexShader, gradientSubtractShader);

    function initFramebuffers() {
      var simRes = getResolution(config.SIM_RESOLUTION);
      var dyeRes = getResolution(config.DYE_RESOLUTION);
      simWidth = simRes.width; simHeight = simRes.height;
      dyeWidth = dyeRes.width; dyeHeight = dyeRes.height;
      var texType = ext.halfFloatTexType, rgba = ext.formatRGBA, rg = ext.formatRG, r = ext.formatR;
      var filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST;
      density = density == null
        ? createDoubleFBO(dyeWidth, dyeHeight, rgba.internalFormat, rgba.format, texType, filtering)
        : resizeDoubleFBO(density, dyeWidth, dyeHeight, rgba.internalFormat, rgba.format, texType, filtering);
      velocity = velocity == null
        ? createDoubleFBO(simWidth, simHeight, rg.internalFormat, rg.format, texType, filtering)
        : resizeDoubleFBO(velocity, simWidth, simHeight, rg.internalFormat, rg.format, texType, filtering);
      divergence = createFBO(simWidth, simHeight, r.internalFormat, r.format, texType, gl.NEAREST);
      curl = createFBO(simWidth, simHeight, r.internalFormat, r.format, texType, gl.NEAREST);
      pressure = createDoubleFBO(simWidth, simHeight, r.internalFormat, r.format, texType, gl.NEAREST);
    }

    function createFBO(w, h, internalFormat, format, type, param) {
      gl.activeTexture(gl.TEXTURE0);
      var texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);
      var fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return {
        texture: texture, fbo: fbo, width: w, height: h,
        attach: function (id) { gl.activeTexture(gl.TEXTURE0 + id); gl.bindTexture(gl.TEXTURE_2D, texture); return id; },
      };
    }
    function createDoubleFBO(w, h, i, f, t, p) {
      var fbo1 = createFBO(w, h, i, f, t, p), fbo2 = createFBO(w, h, i, f, t, p);
      return {
        get read() { return fbo1; }, set read(v) { fbo1 = v; },
        get write() { return fbo2; }, set write(v) { fbo2 = v; },
        swap: function () { var tmp = fbo1; fbo1 = fbo2; fbo2 = tmp; },
      };
    }
    function resizeFBO(target, w, h, i, f, t, p) {
      var n = createFBO(w, h, i, f, t, p);
      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, target.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, 1);
      blit(n.fbo);
      return n;
    }
    function resizeDoubleFBO(target, w, h, i, f, t, p) {
      target.read = resizeFBO(target.read, w, h, i, f, t, p);
      target.write = createFBO(w, h, i, f, t, p);
      return target;
    }

    initFramebuffers();
    multipleSplats(14);
    for (var si = 0; si < 3; si++) splatStack.push(4 + parseInt(Math.random() * 5, 10));

    var lastColorChangeTime = Date.now();
    var virtualSeeded = false, orbitAngle = 0, vPrevX = 0, vPrevY = 0, virtualColor = null, lastVColorTime = 0;
    var engineStart = Date.now();
    var ORBIT_RADIUS = 300, ORBIT_SPEED = 0.026, ORBIT_START_DELAY = 700;
    var activo = true, destroyed = false;

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entradas) { activo = entradas[0].isIntersecting; }).observe(raiz);
    }
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) activo = false;
      else if (raiz.getBoundingClientRect().top < window.innerHeight) activo = true;
    });

    update();
    function update() {
      if (destroyed) return;
      requestAnimationFrame(update);
      if (!activo) return;
      resizeCanvas();
      driveVirtualPointer();
      input();
      if (!config.PAUSED) step(0.016);
      render(null);
    }

    // El cursor invisible orbita el centro para siempre, con una respiración
    // en el radio. Arranca 700ms después de cargar, cuando ya jugó el
    // estallido inicial.
    function driveVirtualPointer() {
      if (Date.now() - engineStart < ORBIT_START_DELAY) return;
      var cx = canvas.width / 2, cy = canvas.height / 2;
      var base = Math.min(ORBIT_RADIUS, canvas.width * 0.35, canvas.height * 0.35);
      var r = base * (0.72 + 0.28 * Math.sin(orbitAngle * 0.37));
      orbitAngle += ORBIT_SPEED;
      var x = cx + Math.cos(orbitAngle) * r, y = cy + Math.sin(orbitAngle) * r;
      if (!virtualSeeded) { virtualSeeded = true; vPrevX = x; vPrevY = y; return; }
      if (!virtualColor || Date.now() - lastVColorTime > 120) {
        virtualColor = generateColor();
        virtualColor.r *= 1.9; virtualColor.g *= 1.9; virtualColor.b *= 1.9;
        lastVColorTime = Date.now();
      }
      var dx = (x - vPrevX) * 9.0, dy = (y - vPrevY) * 9.0;
      vPrevX = x; vPrevY = y;
      splat(x, y, dx, dy, virtualColor);
    }

    function input() {
      if (splatStack.length > 0) multipleSplats(splatStack.pop());
      for (var i = 0; i < pointers.length; i++) {
        var p = pointers[i];
        if (p.moved) { splat(p.x, p.y, p.dx, p.dy, p.color); p.moved = false; }
      }
      if (!config.COLORFUL) return;
      if (lastColorChangeTime + 100 < Date.now()) {
        lastColorChangeTime = Date.now();
        for (var j = 0; j < pointers.length; j++) pointers[j].color = generateColor();
      }
    }

    function step(dt) {
      gl.disable(gl.BLEND);
      gl.viewport(0, 0, simWidth, simHeight);
      curlProgram.bind();
      gl.uniform2f(curlProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(curl.fbo);
      vorticityProgram.bind();
      gl.uniform2f(vorticityProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1));
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
      gl.uniform1f(vorticityProgram.uniforms.dt, dt);
      blit(velocity.write.fbo); velocity.swap();
      divergenceProgram.bind();
      gl.uniform2f(divergenceProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0));
      blit(divergence.fbo);
      clearProgram.bind();
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE_DISSIPATION);
      blit(pressure.write.fbo); pressure.swap();
      pressureProgram.bind();
      gl.uniform2f(pressureProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0));
      for (var it = 0; it < config.PRESSURE_ITERATIONS; it++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1));
        blit(pressure.write.fbo); pressure.swap();
      }
      gradienSubtractProgram.bind();
      gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1));
      blit(velocity.write.fbo); velocity.swap();
      advectionProgram.bind();
      gl.uniform2f(advectionProgram.uniforms.texelSize, 1.0 / simWidth, 1.0 / simHeight);
      if (!ext.supportLinearFiltering) gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, 1.0 / simWidth, 1.0 / simHeight);
      var velocityId = velocity.read.attach(0);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId);
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId);
      gl.uniform1f(advectionProgram.uniforms.dt, dt);
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
      blit(velocity.write.fbo); velocity.swap();
      gl.viewport(0, 0, dyeWidth, dyeHeight);
      if (!ext.supportLinearFiltering) gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, 1.0 / dyeWidth, 1.0 / dyeHeight);
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProgram.uniforms.uSource, density.read.attach(1));
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
      blit(density.write.fbo); density.swap();
    }

    function render(target) {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      var width = target == null ? gl.drawingBufferWidth : dyeWidth;
      var height = target == null ? gl.drawingBufferHeight : dyeHeight;
      gl.viewport(0, 0, width, height);
      colorProgram.bind();
      var bc = config.BACK_COLOR;
      gl.uniform4f(colorProgram.uniforms.color, bc.r / 255, bc.g / 255, bc.b / 255, 1);
      blit(target);
      var program = config.SHADING ? displayShadingProgram : displayProgram;
      program.bind();
      if (config.SHADING) gl.uniform2f(program.uniforms.texelSize, 1.0 / width, 1.0 / height);
      gl.uniform1i(program.uniforms.uTexture, density.read.attach(0));
      blit(target);
    }

    function splat(x, y, dx, dy, color) {
      gl.viewport(0, 0, simWidth, simHeight);
      splatProgram.bind();
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
      gl.uniform2f(splatProgram.uniforms.point, x / canvas.width, 1.0 - y / canvas.height);
      gl.uniform3f(splatProgram.uniforms.color, dx, -dy, 1.0);
      gl.uniform1f(splatProgram.uniforms.radius, config.SPLAT_RADIUS / 100.0);
      blit(velocity.write.fbo); velocity.swap();
      gl.viewport(0, 0, dyeWidth, dyeHeight);
      gl.uniform1i(splatProgram.uniforms.uTarget, density.read.attach(0));
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b);
      blit(density.write.fbo); density.swap();
    }

    function multipleSplats(amount) {
      for (var i = 0; i < amount; i++) {
        var color = generateColor();
        color.r *= 6.0; color.g *= 6.0; color.b *= 6.0;
        var x = canvas.width * Math.random(), y = canvas.height * Math.random();
        var dx = 1000 * (Math.random() - 0.5), dy = 1000 * (Math.random() - 0.5);
        splat(x, y, dx, dy, color);
      }
    }

    function resizeCanvas() {
      if (canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
        initFramebuffers();
      }
    }

    // La entrada llega de window, no del canvas (que tiene pointer-events:
    // none para no robarle clics a los botones del hero), mapeada a espacio
    // de canvas con su rect.
    function pointerPos(clientX, clientY) {
      var rect = canvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    }
    window.addEventListener("mousemove", function (e) {
      var pos = pointerPos(e.clientX, e.clientY);
      var p = pointers[0];
      if (!p.everMoved) { p.everMoved = true; p.x = pos.x; p.y = pos.y; p.down = true; return; }
      p.down = true; p.moved = true;
      p.dx = (pos.x - p.x) * 5.0; p.dy = (pos.y - p.y) * 5.0;
      p.x = pos.x; p.y = pos.y;
      p.color = generateColor();
    }, { passive: true });

    // Sigue el tema en vivo: si el visitante cambia de oscuro a claro (o al
    // revés) con la página abierta, la tinta cambia de paleta sin recargar.
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setTimeout(function () { config.BACK_COLOR = paleta().fondo; }, 0);
      });
    });

    function generateColor() {
      var p = paleta();
      var h = 0.33 + Math.random() * 0.22; // banda verde → teal, nunca sale de la marca
      var c = HSVtoRGB(h, p.sat, p.val);
      c.r *= 0.92; c.g *= 0.92; c.b *= 0.92;
      return c;
    }
    function HSVtoRGB(h, s, v) {
      var r, g, b, i, f, p, q, t;
      i = Math.floor(h * 6); f = h * 6 - i;
      p = v * (1 - s); q = v * (1 - f * s); t = v * (1 - (1 - f) * s);
      switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
      }
      return { r: r, g: g, b: b };
    }
    function getResolution(resolution) {
      var aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio;
      var max = Math.round(resolution * aspectRatio), min = Math.round(resolution);
      return gl.drawingBufferWidth > gl.drawingBufferHeight ? { width: max, height: min } : { width: min, height: max };
    }
  }

  // Lanzar cuando el navegador esté ocioso, con un respaldo garantizado:
  // requestIdleCallback no dispara en pestañas en segundo plano.
  var lanzado = false;
  function lanzar() { if (lanzado) return; lanzado = true; iniciar(); }
  if ("requestIdleCallback" in window) requestIdleCallback(lanzar, { timeout: 1200 });
  setTimeout(lanzar, 1200);
})();
