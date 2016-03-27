
var coins={
  get_vao_striker: function(x,y,z,c1,c2,c3,globals){
    var scale = globals.mfactor;
    var temp_vao  = cylinder.get_vao_cylinder(x,y,z,4*scale,1*scale,c1,c2,c3,globals);
    var striker = {
      vao:temp_vao,
      x:x,y:y,z:z,
      vx:0,vy:0,c:c1
    };
    return striker;
  },

  update_striker: function(striker,globals){
    var scale = globals.mfactor;
    var c1=striker.c;
    striker.vao = cylinder.get_vao_cylinder(striker.x,striker.y,striker.z,4*scale,1*scale,c1,c1,c1,globals);
    return striker;
  }


};
