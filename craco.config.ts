import {container} from 'webpack';

module.exports = {
    devServer: {
        port: 3001
    },
    webpack: {
        //@ts-ignore
        configure:(webpackConfig)=>{
            webpackConfig.output = {
                ...webpackConfig.output,
                publicPath:'auto'
            }
            webpackConfig.plugins = [
                ...webpackConfig.plugins,
                new container.ModuleFederationPlugin({
                    name: 'customer',
                    library: { type: "var", name: "customer" },
                    filename: 'remoteEntry.js',
                    exposes: {
                        './Module': './src/remote-entry.ts',
                        './Services':'./src/services.js'
                    },
                    shared:[
                        {'react':{singleton:true,strictVersion:true},
                            'react-dom':{singleton:true,strictVersion:true},
                            '@mui/material':{singleton:true,strictVersion:true},
                        }]
                })
            ]
            return webpackConfig;
        }
    },
};
