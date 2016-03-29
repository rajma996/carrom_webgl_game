
var LIBS={
  degToRad: function(angle){
    return(angle*Math.PI/180);
  },

  get_projection: function(angle, a, zMin, zMax) {
    var tan=Math.tan(LIBS.degToRad(0.5*angle)),
        A=-(zMax+zMin)/(zMax-zMin),
          B=(-2*zMax*zMin)/(zMax-zMin);

    return [
      0.5/tan, 0 ,   0, 0,
      0, 0.5*a/tan,  0, 0,
      0, 0,          A, -1,
      0, 0,          B, 0
    ];
  },

  get_I4: function() {
    return [1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1];
  },

  set_I4: function(m) {
    m[0]=1, m[1]=0, m[2]=0, m[3]=0,
      m[4]=0, m[5]=1, m[6]=0, m[7]=0,
      m[8]=0, m[9]=0, m[10]=1, m[11]=0,
      m[12]=0, m[13]=0, m[14]=0, m[15]=1;
  },

  rotateX: function(m, angle) {
    var c=Math.cos(angle);
    var s=Math.sin(angle);
    var mv1=m[1], mv5=m[5], mv9=m[9];
    m[1]=m[1]*c-m[2]*s;
    m[5]=m[5]*c-m[6]*s;
    m[9]=m[9]*c-m[10]*s;

    m[2]=m[2]*c+mv1*s;
    m[6]=m[6]*c+mv5*s;
    m[10]=m[10]*c+mv9*s;
  },

  rotateY: function(m, angle) {
    var c=Math.cos(angle);
    var s=Math.sin(angle);
    var mv0=m[0], mv4=m[4], mv8=m[8];
    m[0]=c*m[0]+s*m[2];
    m[4]=c*m[4]+s*m[6];
    m[8]=c*m[8]+s*m[10];

    m[2]=c*m[2]-s*mv0;
    m[6]=c*m[6]-s*mv4;
    m[10]=c*m[10]-s*mv8;
  },

  rotateZ: function(m, angle) {
    var c=Math.cos(angle);
    var s=Math.sin(angle);
    var mv0=m[0], mv4=m[4], mv8=m[8];
    m[0]=c*m[0]-s*m[1];
    m[4]=c*m[4]-s*m[5];
    m[8]=c*m[8]-s*m[9];

    m[1]=c*m[1]+s*mv0;
    m[5]=c*m[5]+s*mv4;
    m[9]=c*m[9]+s*mv8;
  },

  translateZ: function(m, t){
    m[14]+=t;
  },

  get_ortho: function(left,right,top,bottom,near,far){
    return [
      2/(right-left),0,0,0,
      0,2/(top-bottom),0,0,
      0,0,2/(far-near),0,
      -1*(right+left)/(right-left),-1*(top+bottom)/(top-bottom),(far+near)/(far-near),1
    ];
  },

  cross : function (a, b) {
  return [a[1] * b[2] - a[2] * b[1],
          a[2] * b[0] - a[0] * b[2],
          a[0] * b[1] - a[1] * b[0]];
  },

  subtractVectors: function(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  },

  normalize: function(v) {
    var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    // make sure we don't divide by 0.
    if (length > 0.00001) {
      return [v[0] / length, v[1] / length, v[2] / length];
    } else {
      return [0, 0, 0];
    }
  },

  makeLookAt: function(cameraPosition, target, up) {
      var zAxis = LIBS.normalize(
          LIBS.subtractVectors(cameraPosition, target));
      var xAxis = LIBS.cross(up, zAxis);
      var yAxis = LIBS.cross(zAxis, xAxis);

      return [
         xAxis[0], xAxis[1], xAxis[2], 0,
         yAxis[0], yAxis[1], yAxis[2], 0,
         zAxis[0], zAxis[1], zAxis[2], 0,
         cameraPosition[0],
         cameraPosition[1],
         cameraPosition[2],
         1];
    },


    makePerspective: function(fieldOfViewInRadians, aspect, near, far) {
        var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
        var rangeInv = 1.0 / (near - far);

        return [
          f / aspect, 0, 0, 0,
          0, f, 0, 0,
          0, 0, (near + far) * rangeInv, -1,
          0, 0, near * far * rangeInv * 2, 0
        ];
      }


};
