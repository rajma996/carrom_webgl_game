
var collision={
  dis: function(x1,y1,x2,y2){
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
  },

  check_collision : function(x1,y1,x2,y2,vx1,vy1,vx2,vy2,globals){
    var vec1 = [x2-x1,y2-y1];
    var valongv1_c = vec1[0]*vx1/collision.mag(vec1)+vec1[1]*vy1/collision.mag(vec1);
    var valongv1 = [valongv1_c*vec1[0]/collision.mag(vec1) , valongv1_c*vec1[1]/collision.mag(vec1)  ];
    var vperpv1 = [vx1-valongv1[0],vy1-valongv1[1]];

    var vec2 = [x2-x1,y2-y1];
    var valongv2_c = vec2[0]*vx2/collision.mag(vec2)+vec2[1]*vy2/collision.mag(vec2);
    var valongv2 = [valongv2_c*vec2[0]/collision.mag(vec2),valongv2_c*vec2[1]/collision.mag(vec1)];
    var vperpv2 = [vx2-valongv2[0],vy2-valongv2[1]];

    var vnet1 = [valongv2[0]+vperpv1[0],valongv2[1]+vperpv1[1]];
    var vnet2 = [valongv1[0]+vperpv2[0],valongv1[1]+vperpv2[1]];

    var final =  [vnet1[0],vnet1[1],vnet2[0],vnet2[1]];


    var i;
    // for (i=0;i<final.length;i++)
    // {
    //   // if(Math.abs(final[i]>500))
    //   // {
    //     console.log(x1,y1,x2,y2,vx1,vy1,vx2,vy2);
    //     console.log(vec1);
    //     console.log(valongv1_c);
    //     console.log(valongv1);
    //     console.log(vperpv1);
    //
    //     console.log(vec2);
    //     console.log(valongv2_c);
    //     console.log(valongv2);
    //     console.log(vperpv2);
    //
    //      console.log(final[i]);
    //   // }
    // }
    return final;
  },

  mag : function(vec){
    return Math.sqrt(vec[0]*vec[0]+vec[1]*vec[1]);

  },
  check_boundary(coin,globals){
    var scale = globals.mfactor;
    if(coin.x+coin.r>=75*scale/2-15) return 1;
    else if(coin.x-coin.r<=-75*scale/2+15) return 3;
    else if(coin.y+coin.r>=75*scale/2-15) return 2;
    else if(coin.y-coin.r<=-75*scale/2+15) return 4;
    else return 0;
  },

  check_pocket(coin,globals){
    var scale = globals.mfactor;
    if(collision.dis(Math.abs(coin.x),Math.abs(coin.y),75*scale/2-50,75*scale/2-50)<=coin.r) return 1;
    else return 0;
  }

};
