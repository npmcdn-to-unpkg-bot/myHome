/**
 * Created by silent on 14-1-26.
 */
var publicResourceLoader=null;
(function(){
    var scripts=document.querySelectorAll('script[type="text/javascript"][src]'),matches,resourceUrl='';
    for(var i=0;i<scripts.length;i++){
        if(matches=scripts[i].src.match(/^.*?(?=resource\/js\/resource_loader\.js)/)){
            resourceUrl=matches[0];
        }
    }
    function PublicResourceLoader(config){
        this.css=config.css;
        this.scripts=config.scripts;
        this.head=document.getElementsByTagName('head')[0];
        this.loadCSS();
        this.loadScript();
    }
    PublicResourceLoader.prototype={
        construct:PublicResourceLoader,
        loadCSS:function(){
            var that=this;
            this.css.forEach(function(csslink){
           	 	//jinyao
            	csslink = "./countmoney/index.css";
                document.write(' <link href="'+csslink+'" rel="stylesheet" />')
            });
        },
        loadScript:function(){
            var that=this;
            this.scripts.forEach(function(scriptlink){
                document.write('<script type="text/javascript" src="'+scriptlink+'"></script>')
            });
        },
        getPath:function(){
            return resourceUrl;
        }
    };
    publicResourceLoader =new PublicResourceLoader({
//         css:[resourceUrl+'resource/css/index.css?version='+Math.random()],
//         scripts:[
//             resourceUrl+'resource/js/jquery.min.js',
//             resourceUrl+'resource/js/server.js?version='+Math.random(),
//             resourceUrl+'resource/js/adSceneInGames.js?version='+Math.random(),
//             resourceUrl+'resource/js/game_index.js?version='+Math.random()
//         ]
        css:['./countmoney/index.css?version='+Math.random()],
        scripts:[
            './countmoney/jquery.min.js',
            './countmoney/server.js?version='+Math.random(),
            './countmoney/adSceneInGames.js?version='+Math.random(),
            './countmoney/game_index.js?version='+Math.random()
        ]
    });
}());