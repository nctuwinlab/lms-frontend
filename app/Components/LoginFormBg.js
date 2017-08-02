import createjs from 'createjs-cmd';
import { TweenLite } from 'gsap';

export default class LoginFormBg{
    constructor(){
        setTimeout(
            () => this.init(),
        1000);
    }


    async init(){
        this.StageInit();
        this.CirclesInit();
        this.TextInit();
        this.animate();
        await this.BeforeLogin();
        setTimeout(
            () => this.createText(),
        1000);
    }

    StageInit(){
        let textStage = new createjs.Stage("loginTitle");
        textStage.canvas.width = window.innerWidth;
        textStage.canvas.height = 200;
        this.textStage = textStage;

        let stage = new createjs.Stage("stage");
        stage.canvas.width = window.innerWidth;
        stage.canvas.height = window.innerHeight;
        this.stage = stage;
    }

    TextInit() {
        let text = new createjs.Text("t", "80px 'Source Sans Pro'", "rgba(0,0,0,0.01)");
        text.textAlign = 'center';
        text.x = window.innerWidth/2;
        this.text = text;
    }

    CirclesInit(){
        this.circles = [];
        let colors = ['#B2949D', '#FFF578', '#FF5F8D', '#37A9CC', '#188EB2'];
        for(let i=0; i<600; i++) {
            let circle = new createjs.Shape();
            let r = 7;
            let x = window.innerWidth*Math.random();
            let y = window.innerHeight*Math.random();
            let color = colors[Math.floor(i%colors.length)];
            let alpha = 0.2 + Math.random()*0.5;
            circle.alpha = alpha;
            circle.radius = r;
            circle.graphics.beginFill(color).drawCircle(0, 0, r);
            circle.x = x;
            circle.y = y;
            this.circles.push(circle);
            this.stage.addChild(circle);
            circle.movement = 'float';
        }
    }

    createText() {
        //let fontSize = 860/(t.length);
        //if (fontSize > 160) fontSize = 160;
        let fontSize = 140;
        let { text, textStage } = this;
        text.text = 'LOGIN';
        text.font = "900 "+fontSize+"px 'Source Sans Pro'";
        text.textAlign = 'center';
        text.x = window.innerWidth/2;
        text.y = (172-fontSize)/2;
        textStage.addChild(text);
        textStage.update();

        let ctx = document.getElementById('loginTitle').getContext('2d');
        let pix = ctx.getImageData(0,0,window.innerWidth,200).data;
        this.textPixels = [];
        for (let i = pix.length-1; i >= 0; i -= 4) {
            if (pix[i] != 0) {
                let x = ((i+1) / 4) % window.innerWidth;
                let y = Math.floor(Math.floor((i+1)/window.innerWidth)/4);

                if((x && x%8 == 0) && (y && y%8 == 0)) 
                    this.textPixels.push({x: x, y: y});
            }
        }
        this.formText();
    }

    formText(){
        let { textPixels, circles } = this;
        for(let i= 0, l=textPixels.length; i<l; i++) {
            circles[i].originX = textPixels[i].x;
            circles[i].originY = (window.innerHeight-150)/2 + textPixels[i].y;
            this.BeforeLoginTween(circles[i]);
        }
        if(textPixels.length < circles.length) {
            for(let j = textPixels.length; j<circles.length; j++) {
                circles[j].tween = TweenLite.to(circles[j], 0.4, {alpha: 0.1});
            }
        }
    }

    animate(){
        this.stage.update();
        requestAnimationFrame(this.animate.bind(this));
    }

    explode() {
        let { circles, textPixels } = this;
        for(let i= 0, l=textPixels.length; i<l; i++) {
            TweenCircle(circles[i], 'out');
        }
        if(textPixels.length < circles.length) {
            for(let j = textPixels.length; j<circles.length; j++) {
                circles[j].tween = TweenLite.to(circles[j], 0.4, {alpha: 1});
            }
        }
    }
    
    TweenCircle(c, dir){
        if(c.tween) c.tween.kill();
        if(dir == 'in'){
            c.tween = TweenLite.to(
                c, 
                0.7, 
                {   
                    x:      c.originX, 
                    y:      c.originY, 
                    ease:   Expo.easeIn,
                    alpha:  1, 
                    radius: 5, 
                    scaleX: 0.4, 
                    scaleY: 0.4, 
                    onComplete: () => {
                        c.movement = 'jiggle';
                        this.TweenCircle(c);
                    }
                }
            );
        } else if(dir == 'out'){
            c.tween = TweenLite.to(
                c, 
                0.8, 
                {   
                    x:      window.innerWidth*Math.random(), 
                    y:      window.innerHeight*Math.random(), 
                    ease:   Quad.easeInOut, 
                    alpha:  0.2 + Math.random()*0.5, 
                    scaleX: 1, 
                    scaleY: 1, 
                    onComplete: () => {
                        c.movement = 'float';
                        this.TweenCircle(c);
                    }
                }
            );
        } else {
            if(c.movement == 'float'){
                c.tween = TweenLite.to(
                    c, 
                    5 + Math.random()*3.5, 
                    {
                        x:     c.x + -100+Math.random()*200, 
                        y:     c.y + -100+Math.random()*200, 
                        ease:  Quad.easeInOut, 
                        alpha: 0.2 + Math.random()*0.5,
                        onComplete: () => {
                            this.TweenCircle(c);
                        }
                    }
                );
            } else {
                c.tween = TweenLite.to(
                    c, 
                    0.05, 
                    {
                        x:    c.originX + Math.random()*3, 
                        y:    c.originY + Math.random()*3, 
                        ease: Quad.easeInOut,
                        onComplete: () => {
                            this.TweenCircle(c);
                        }
                    }
                );
            }
        }
    }

    BeforeLogin(){
       for(let circle of this.circles){
            TweenLite.fromTo(
                circle, 
                0.5,
                {
                    scaleX: 0,
                    scaleY: 0, 
                    alpha:  0, 
                },
                {
                    scaleX: 1,
                    scaleY: 1, 
                    alpha:  circle.alpha
                }
            ).delay(Math.random()/2);
       }
    }

    BeforeLoginTween(c){
        c.tween = TweenLite.to(
            c, 
            0.7, 
            {   
                x:      c.originX, 
                y:      c.originY, 
                ease:   Expo.easeIn,
                alpha:  1, 
                radius: 5, 
                scaleX: 0.4, 
                scaleY: 0.4, 
            }
        );

        c.originY = c.originY - window.innerHeight/3;
        
        c.tween = TweenLite.to(
            c, 
            0.7, 
            {   
                x:      c.originX, 
                y:      c.originY, 
            }
        ).delay(1.2);
    }
}

