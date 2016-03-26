var canvas;
var ctx;
var exts;

try {
      canvas = createElement('canvas');
        ctx = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
          exts = ctx.getSupportedExtensions();
}
catch (e) {
      return;
}

if (ctx !== undefined) {
      Modernizr.webglextensions = new Boolean(true);
}

for (var i = -1, len = exts.length; ++i < len; ){
      Modernizr.webglextensions[exts[i]] = true;
}

canvas = undefined;
