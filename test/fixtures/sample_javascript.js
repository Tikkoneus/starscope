/* @flow */

import React from 'react-native';

var {
  Component,
  StyleSheet,
} = React;

var {NavigationBar} = Navigator;

var styles = StyleSheet.create({
  navigatorBar: {
    height: NavigationBar.Styles.General.NavBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

StatusBarIOS.setStyle(1);
Router.routes = routes;

var NavigatorRouteMapper = {
  Title({route}) {
    return (
      <View style={styles.navigatorBar}>
        <Text style={{color: Branding.white, fontFamily: Branding.fontBold, fontSize: 16}}>{route.title}</Text>
      </View>
    );
  },

  LeftButton({route}, navigator, index) {
    if (!index) { return null; } // Nothing below in stack.

    return (
      <TouchableOpacity onPress={() => navigator.pop()}>
        <Text style={{color: 'white', fontSize: 12, marginLeft: 1}}>‹</Text>
      </TouchableOpacity>
    );
  },

  RightButton() {
    return null;
  },
};

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {key: 'foo', selectedTab: 'foo'};

  }

  _tabItem(routeName: string, params: Object, badgeCount?: number) : PropTypes.element {
    var route = routes[routeName];
    var title = route.title;
    var icon = route.icon;

    var onTabPress = () => {
      if (this.state.selectedTab === routeName) {
        if (route === Router.currentRoute) {
          Router.navigator._currentQueryFetcherRoot.fetchData();
        } else {
          Router.popToTop();
        }
      } else {
        this.setState({selectedTab: routeName});
      }
    };

    return (
      <TabBarIOS.Item
        icon={icon}
        title={title}
        badge={badgeCount}
        selected={this.state.selectedTab === routeName}
        onPress={onTabPress}
      >
        <Navigator
          ref={::this._setCurrentNavigator}
          navigationBar={
            <NavigationBar routeMapper={NavigatorRouteMapper} style={{backgroundColor: Branding.pink}} />
          }
        />

      </TabBarIOS.Item>
    );
  }

  _setCurrentNavigator(nav) {
    Router.navigator = nav;
  }

  _renderTabScene({route, params}, nav) {
    var setRef = (ref) => {
      nav._currentQueryFetcherRoot = ref;
    };

    return <QueryFetcherRoot ref={setRef} component={route.component} route={route} params={params} />;
  }

  render() {
    return (
      <TabBarIOS tintColor={Branding.yellow} barTintColor={Branding.green}>
        {this._tabItem('foo', {})}
        {this._tabItem('bar', {})}
        {this._tabItem('baz', {})}
      </TabBarIOS>
    );
  }
}

export default Navigation;
