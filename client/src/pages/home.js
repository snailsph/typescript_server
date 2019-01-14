import React, { Component } from 'react';
import { Layout} from 'antd';
import '../style/index.less';
import SiderCustom from '../components/SiderCustom';
import HeaderCustom from '../components/HeaderCustom';
const { Content, Footer } = Layout;

class Home extends Component {
    state = {
        collapsed: false,
    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    render() {
        return (
            <Layout>
                 <SiderCustom collapsed={this.state.collapsed} />
                <Layout style={{flexDirection: 'column'}}>
                    <HeaderCustom toggle={this.toggle} collapsed={this.state.collapsed}/>
                    <Content style={{ margin: '0 16px', overflow: 'initial', flex: '1 1 0' }}>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                    零吆科技 ©{new Date().getFullYear()} Created by sph
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}


export default Home;
