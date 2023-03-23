const path = require("path");
//플러그인은 빌드하는 프로세스에 추가적으로 기능을 제공해준다.
//추가적으로 개발자가 설정하는거라서 웹팩이 인식할수 있게 require로 넣어준다.
//로더는 일반적으로 모듈 번들링의 일부로 따로 불러오지 않아도 자동적으로 인식하고 로딩하고 적용한다.
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    entry: './src/index.js',
    devServer: {
        static: './dist'
    },
    output: {
        path : path.resolve(__dirname, 'dist'),
        //github 배포할때 docs파일만 읽는다.
        filename: '[name].bundle.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env"],
                            ["@babel/preset-react", {runtime: "automatic"}]
                        ],
                        plugins: ["react-hot-loader/babel"]
                    }
                }

            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html")
        }),
        new MiniCssExtractPlugin(),
        // 이 플러그인은 빌드할 시 이렇게 따로 설정해줄 수도 있습니다. package.json에 가셔서
        // 커맨드를 어떻게 주었는지 확인해보세요.
        new BundleAnalyzerPlugin({
            //분석 모드는 뭘로 할 건지
          analyzerMode: "static",
            //빌드하고 나서 바로 열 건지
          openAnalyzer: false,
            //파일 만들 건지
          generateStatsFile: true,
            //파일 이름 뭘로 할 건지
          statsFilename: "bundle-report.json",
        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ],
        runtimeChunk: 'single'
    },
    mode: "development"
}

};