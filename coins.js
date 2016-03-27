
var coins={
  get_vao_striker: function(x,y,z,c1,c2,c3,globals){
    var scale = globals.mfactor;
    var temp_vao  = cylinder.get_vao_cylinder(x,y,z,globals.sfactor*scale,1*scale,c1,c2,c3,globals);
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
    striker.vao = cylinder.get_vao_cylinder(striker.x,striker.y,striker.z,globals.sfactor*scale,1*scale,c1,c1,c1,globals);
    return striker;
  },

  set_coins: function(globals){
    coins_vao = []
    var scale = globals.mfactor;
    var cscale = globals.cfactor;
    var temp = twod.get_vao_circle(8*scale,0,-11,cscale*scale,1,1,1,globals);
    coins_vao.push(temp);
    temp = twod.get_vao_circle(0,8*scale,-11,cscale*scale,1,1,1,globals);
    coins_vao.push(temp);
    temp = twod.get_vao_circle(-1*8*scale,0,-11,cscale*scale,1,1,1,globals);
    coins_vao.push(temp);
    temp = twod.get_vao_circle(0,-1*8*scale,-11,cscale*scale,1,1,1,globals);
    coins_vao.push(temp);

    temp = twod.get_vao_circle(8*scale/1.41,8*scale/1.41,-11,cscale*scale,0,0,0,globals);
    coins_vao.push(temp);
    temp = twod.get_vao_circle(-1*8*scale/1.41,8*scale/1.41,-11,cscale*scale,0,0,0,globals);
    coins_vao.push(temp);
    temp = twod.get_vao_circle(8*scale/1.41,-1*8*scale/1.41,-11,cscale*scale,0,0,0,globals);
    coins_vao.push(temp);
    temp = twod.get_vao_circle(-1*8*scale/1.41,-1*8*scale/1.41,-11,cscale*scale,0,0,0,globals);
    coins_vao.push(temp);

    return coins_vao;
  }


};
