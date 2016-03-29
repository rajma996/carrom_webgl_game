
var coins={
  get_vao_striker: function(x,y,z,c1,c2,c3,globals){
    var scale = globals.mfactor;
    var temp_vao  = cylinder.get_vao_cylinder(x,y,z,globals.sfactor*scale,1*scale,c1,c2,c3,globals);
    var striker = {
      vao:temp_vao,
      x:x,y:y,z:z,r:globals.sfactor*scale,
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

  update_coin: function(coin,globals){
    var scale = globals.mfactor;
    var cscale = globals.cfactor;
    var c1 = coin.c1;
    var c2 = coin.c2
    var c3=coin.c3;
    coin.vao = twod.get_vao_circle(coin.x,coin.y,coin.z,cscale*scale,c1,c2,c3,globals);
    return coin;

  },
  set_coins: function(globals){
    coins_vao = []
    var scale = globals.mfactor;
    var cscale = globals.cfactor;
    var temp_vao = twod.get_vao_circle(8*scale,0,-11,cscale*scale,1,1,1,globals);
    var temp = {
      vao:temp_vao,
      x:8*scale,y:0,z:-11,c1:1,c2:1,c3:1,vx:0,vy:0,r:cscale*scale
    };
    coins_vao.push(temp);
    temp_vao = twod.get_vao_circle(0,8*scale,-11,cscale*scale,1,1,1,globals);
    temp = {
      vao:temp_vao,
      x:0,y:8*scale,z:-11,c1:1,c2:1,c3:1,vx:0,vy:0,r:cscale*scale
    };
    coins_vao.push(temp);
    temp_vao = twod.get_vao_circle(-1*8*scale,0,-11,cscale*scale,1,1,1,globals);
    temp ={
      vao:temp_vao,
      x:-1*8*scale,y:0,z:-11,c1:1,c2:1,c3:1,vx:0,vy:0,r:cscale*scale
    };
    coins_vao.push(temp);
    temp_vao = twod.get_vao_circle(0,-1*8*scale,-11,cscale*scale,1,1,1,globals);
    temp = {
      vao:temp_vao,
      x:0,y:-1*8*scale,z:-11,c1:1,c2:1,c3:1,vx:0,vy:0,r:cscale*scale
    };
    coins_vao.push(temp);

    temp_vao = twod.get_vao_circle(8*scale/1.41,8*scale/1.41,-11,cscale*scale,0,0,0,globals)
    temp = {
      vao:temp_vao,
      x:8*scale/1.41,y:8*scale/1.41,z:-11,c1:0,c2:0,c3:0,vx:0,vy:0,r:cscale*scale
    };
    coins_vao.push(temp);
    temp_vao = twod.get_vao_circle(-1*8*scale/1.41,8*scale/1.41,-11,cscale*scale,0,0,0,globals);
    temp = {
      vao:temp_vao,
      x:-1*8*scale/1.41,y:8*scale/1.41,z:-11,c1:0,c2:0,c3:0,vx:0,vy:0,r:cscale*scale
    };
    coins_vao.push(temp);
    temp_vao = twod.get_vao_circle(8*scale/1.41,-1*8*scale/1.41,-11,cscale*scale,0,0,0,globals)
    temp = {
      vao:temp_vao,
      x:8*scale/1.41,y:-1*8*scale/1.41,z:-11,c1:0,c2:0,c3:0,vx:0,vy:0,r:cscale*scale
    };
    coins_vao.push(temp);
    temp_vao = twod.get_vao_circle(-1*8*scale/1.41,-1*8*scale/1.41,-11,cscale*scale,0,0,0,globals);
    temp = {
      vao:temp_vao,
      x:-1*8*scale/1.41,y:-1*8*scale/1.41,z:-11,c1:0,c2:0,c3:0,vx:0,vy:0,r:cscale*scale
    };
    coins_vao.push(temp);
    temp_vao = twod.get_vao_circle(0,0,-11,cscale*scale,1,0,0,globals);
    temp = {
      vao:temp_vao,
      x:0,y:0,z:-11,c1:1,c2:0,c3:0,vx:0,vy:0,r:cscale*scale
    };
    coins_vao.push(temp);

    return coins_vao;
  }


};
