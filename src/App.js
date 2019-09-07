/*!
 *
 * Angle - Bootstrap Admin Template
 *
 * Version: 4.2.2
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: https://wrapbootstrap.com/help/licenses
 *
 */

import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';
import {ReactTableDefaults} from 'react-table';
// App Routes
import Routes from './Routes';
// Vendor dependencies
import "./Vendor";
// Application Styles
import './styles/bootstrap.scss';
import './styles/app.scss'


class App extends Component {
    render() {

        // specify base href from env varible 'PUBLIC_URL'
        // use only if application isn't served from the root
        // for development it is forced to root only
        /* global PUBLIC_URL */
        const basename = process.env.NODE_ENV === 'development' ? '/' : (PUBLIC_URL || '/');

        return (
            <BrowserRouter basename={basename}>
                <Routes/>
            </BrowserRouter>
        );

    }
}

// 设置默认值
(function () {
    Object.assign(ReactTableDefaults, {
        previousText: '后退',
        nextText: '前进',
        loadingText: '请求数据中',
        noDataText: '暂无数据',
        pageText: '第',
        ofText: '页 共',
        rowsText: '行',
        getTdProps: () => {
            return {
                // 使文字内容水平、垂直居中，且自动换行
                style: {
                    'textAlign': 'center',
                    'display': 'flex',
                    'flexDirection': 'column',
                    'justifyContent': 'center',
                    'whiteSpace': 'unset'
                }
            };
        }
    })
})();

export default App;
