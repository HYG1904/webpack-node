var path = require("path")
var webpack=require("webpack")
var htmlWebpackPlugin=require("html-webpack-plugin")
module.exports={
//    context:__dirname,
    entry:{
        // index:"./js/index.js",
        index1:"./js/index.js"
	},
    output:{
        path:path.resolve(__dirname,"./dist"),
        filename:"js/[name].[chunkHash:5].js", //解决入口为对象这种多个文件name hash chunkhash
    },
    mode: 'development' // 设置mode，"The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment."在package.json中需要指定"dev": "webpack --mode development","build": "webpack --mode production"
    ,
    stats: { children: false }, //解决"Entrypoint undefined = index.html"错误
    module:{
        rules:[
            {test:/\.css$/, loader: "style-loader!css-loader!postcss-loader"},
            // {test:/\.html$/i,loader:"html-withimg-loader"},
            // {test:/\.(png|img|gif|svg)$/,loader:"url-loader?limit=10000&name=img/[name].[ext]"
            // }
            {test:/\.(png|img|gif|svg)$/,loader:"file-loader",query:{
                name:"img/[name].[ext]"
            }}
        ]
    },
    plugins:[
        new htmlWebpackPlugin(
            {
            // 多页面，就是用多个模板和插件
            filename:"index.html",
            // template:'html-withimg-loader!'+path.resolve(__dirname, 'index.html'),
            template:"index.html",
            inject:"body", 
			minify:{
			removeComments:true, //删除注释
            collapseWhitespace:true, //删除空格
            chunks:["index1"]  //
            }
        }
        )
    ]
}