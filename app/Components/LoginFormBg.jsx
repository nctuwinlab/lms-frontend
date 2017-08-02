import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asideOpenEnd } from '../Actions/action';

import createjs from 'createjs-cmd';
import { TweenLite } from 'gsap';

class LoginFormBg extends Component{
    render(){
        return (
            <div>
                <canvas id="stage" ref={(d) => {this.stageDOM = d}}></canvas>
                <canvas id="loginTitle"></canvas>
                { this.props.isLogin ? <canvas id="loginUser"></canvas>:null }
            </div>
        )
    }

    componentWillUpdate(nextProps, nextState){
        console.log('update');
        this.AfterLogin();
    }

    componentDidMount(){
        console.log('mount');
        setTimeout( async () => {
            this.StageInit();
            this.CirclesInit();
            this.TextInit();
            this.animate();
            await this.BeforeLogin();
            setTimeout(
                () => this.CreateText(),
            1000);

        }, 1000);
    }

    StageInit(){
        let textStage = new createjs.Stage("loginTitle");
        textStage.canvas.width = window.innerWidth;
        textStage.canvas.height = 300;
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
        let circleNum = 0;
        if(window.innerWidth >= 1600){
            circleNum = 1200;
        } else if(window.innerWidth < 1600 && window.innerWidth > 1200){
            circleNum = 800;
        } else {
            circleNum = 600;
        }
        for(let i=0; i<circleNum; i++) {
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

    CreateText() {
        //let fontSize = 860/(t.length);
        //if (fontSize > 160) fontSize = 160;
        let fontSize = window.innerWidth / 6;
        let { text, textStage } = this;
        text.text = 'LOGIN';
        text.font = "900 "+fontSize+"px 'Source Sans Pro'";
        text.textAlign = 'center';
        text.x = window.innerWidth/2;
        text.y = (172-fontSize)/2;
        textStage.addChild(text);
        textStage.update();

        let ctx = document.getElementById('loginTitle').getContext('2d');
        let pix = ctx.getImageData(0,0,window.innerWidth,300).data;
        this.textPixels = [];
        for (let i = pix.length-1; i >= 0; i -= 4) {
            if (pix[i] != 0) {
                let x = ((i+1) / 4) % window.innerWidth;
                let y = Math.floor(Math.floor((i+1)/window.innerWidth)/4);

                if((x && x%10 == 0) && (y && y%10 == 0)) 
                    this.textPixels.push({x: x, y: y});
            }
        }
        this.FormText();
    }

    FormText(){
        let { textPixels, circles } = this;
        for(let i= 0, l=textPixels.length; i<l; i++) {
            circles[i].originX = textPixels[i].x;
            circles[i].originY = (window.innerHeight-300)/2 + textPixels[i].y;
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
                scaleX: 0.5, 
                scaleY: 0.5, 
            }
        );
        let offsetY = (window.innerWidth - 300)/2;
        c.originY += (offsetY - c.originY)/5;
        c.originY = c.originY - window.innerHeight/3;
        c.originX += (window.innerWidth/2 - c.originX)/5;

        c.tween = TweenLite.to(
            c, 
            0.7, 
            {   
                x:      c.originX, 
                y:      c.originY,
                scaleX: 0.4, 
                scaleY: 0.4, 
                onComplete: () => {
                    this.props.asideOpenEnd();
                }
            }
        ).delay(1.2);
    }
    
    AfterLogin() {
        let { circles, textPixels } = this;
        for(let i= 0, l=textPixels.length; i<l; i++) {
            this.AfterLoginTween(circles[i]);
        }
        for(let i=textPixels.length; i<circles.length; i++){
            this.CircleFloating(circles[i]);
        }
        if(textPixels.length < circles.length) {
            for(let j = textPixels.length; j<circles.length; j++) {
                circles[j].tween = TweenLite.to(circles[j], 0.4, {alpha: 0.2 + Math.random()*0.5});
            }
        }
    }

    AfterLoginTween(c){
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
                    this.CircleFloating(c);
                }
            }
        );
    }

    CircleFloating(c){
        c.tween = TweenLite.to(
            c, 
            5 + Math.random()*3.5, 
            {
                x:     c.x + -100+Math.random()*200, 
                y:     c.y + -100+Math.random()*200, 
                ease:  Quad.easeInOut, 
                alpha: 0.2 + Math.random()*0.5,
                onComplete: () => {
                    this.CircleFloating(c);
                }
            }
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        asideOpenEnd: () => {
            dispatch(asideOpenEnd());
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginFormBg);

