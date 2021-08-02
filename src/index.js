import * as PIXI from 'pixi.js';
import  PixiPlugin  from "gsap/PixiPlugin";

import { sound } from '@pixi/sound';

import gsap from 'gsap';


import Logo from './pixijs-logo.png';
import Stats from 'stats.js';

import './style.scss';

// IN ORDER TO USE GREENSOCK WITH PIXI JS YOU MUST FIRST REGISTER PixiPlugin.
gsap.registerPlugin(PixiPlugin);
// THEN REGISTER PixiPlugin TO PIXI, THIS IS REALLY IMPORTANT TOOK SOME TIME TO FIGURE IT OUT
// IMPORTANT BELOW WITHOUT THIS GSAP WONT WORK WITH THE LATEST PIXI V5.
PixiPlugin.registerPIXI(PIXI)



let WIDTH = 1920;
let HEIGHT = 1080;
let logo = null;
let root = document.getElementById('root');

const onResize = (e = null) => {
    console.log('resize');

   var iw = window.innerWidth, ih=window.innerHeight;			
   var pRatio = 1, xRatio=iw/WIDTH, yRatio=ih/HEIGHT, sRatio=1;			

   sRatio = Math.max(xRatio, yRatio);
   app.resize(iw, ih);
   container.scale.set(pRatio*sRatio,pRatio*sRatio)
   container.position.set(app.screen.width/2,app.screen.height/2);

   lastW = iw; lastH = ih; lastS = sRatio;  
}
var lastW, lastH, lastS=1;		


const setup = (loader, resources) => {
    //console.log('setup')
    logo = new PIXI.Sprite(resources.logo.texture);
    logo.anchor.set(0.5)
    container.addChild(logo);

    gsap.from(logo, {duration:1, pixi:{scale:0, alpha:0, rotation:'-=360*2'},   repeat:-1, repeatDelay:1, yoyo:true})
   
    onResize();
   
    window.addEventListener('resize', onResize);
}


let app = new PIXI.Application({width:WIDTH, 
                           height:HEIGHT, 
                           backgroundColor:0x000000, 
                           resolution:true, 
                           autoResize:true,
                           resizeTo:window});

const { view, loader, stage, screen } = app;

root.appendChild(view);

const container = new PIXI.Container();

stage.addChild(container);

loader.add('logo', Logo)
      .load(setup);

app.ticker.add(tick);

const tick = () => {
          
}
const stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom

document.body.appendChild( stats.dom);

const animate = () => {

	stats.begin();
	stats.end();

	requestAnimationFrame( animate );
}
requestAnimationFrame( animate );

