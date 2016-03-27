
var cuboid={
  get_vao_cube: function(x,y,z,a,b,c,c1,c2,c3,globals){
    var vertices = [
      x-a,y-b,z-c,    c1,c2,c3,
      x-a,y+b,z-c,    c1,c2,c3,
      x+a,y+b,z-c,    c1,c2,c3,
      x+a,y-b,z-c,    c1,c2,c3,

      x-a,y-b,z+c,    c1,c2,c3,
      x-a,y+b,z+c,    c1,c2,c3,
      x+a,y+b,z+c,    c1,c2,c3,
      x+a,y-b,z+c,    c1,c2,c3

    ]
    var face = [
      0,1,2,0,2,3,
      1,2,5,2,5,6,
      4,5,6,4,7,6,
      0,3,7,0,4,7,
      0,4,5,0,1,5,
      2,3,7,2,7,6
    ]

    var vao_temp = construct.get_vao(vertices,face,globals);
    var cube = {
      vao:vao_temp,
      x:x,a:a,
      y:y,b:b,
      z:z,c:c
    };
    return cube;
  }


};
