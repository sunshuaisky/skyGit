import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert
} from 'react-native'
import CheckBox from 'react-native-check-box'
import NavigationBar from '../../common/NavigationBar'
import ViewUtils from '../../utils/ViewUtils'
import ArrayUtils from '../../utils/ArrayUtils'
import LanguageDao, { FLAG_LANGUAGE } from '../../expand/dao/LanguageDao'

export default class CustomKeyPage extends Component {
  constructor(props) {
    super(props)
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key)
    this.changeValue = []
    this.state = {
      dataArray: []
    }
  }

  componentDidMount() {
    this.loadData()
  }

  loadData() {
    this.languageDao
      .fetch()
      .then(result => {
        this.setState({
          dataArray: result
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  onSave() {
    if (this.changeValue.length === 0) {
      this.props.navigator.pop()
      return
    }
    this.languageDao.save(this.state.dataArray)
    this.props.navigator.pop()
  }

  renderView() {
    if (!this.state.dataArray || this.state.dataArray.length === 0) return null
    let len = this.state.dataArray.length
    let views = []
    for (let i = 0, l = len - 2; i < l; i += 2) {
      views.push(
        <View key={i}>
          <View style={styles.item}>
            {this.renderCheckBox(this.state.dataArray[i])}
            {this.renderCheckBox(this.state.dataArray[i + 1])}
          </View>
          <View style={styles.line} />
        </View>
      )
    }
    views.push(
      <View key={len - 1}>
        <View style={styles.item}>
          {len % 2 === 0
            ? this.renderCheckBox(this.state.dataArray[len - 2])
            : null}
          {this.renderCheckBox(this.state.dataArray[len - 1])}
        </View>
        <View style={styles.line} />
      </View>
    )
    return views
  }

  onClick(data) {
    data.checked = !data.checked
    ArrayUtils.updateArray(this.changeValue, data)
    this.setState({
      dataArray: this.state.dataArray
    })
  }

  renderCheckBox(data) {
    let leftText = data.name
    // let isChecked = this.isRemoveKey ? false : data.checked;
    return (
      <CheckBox
        style={{ flex: 1, padding: 10 }}
        onClick={() => this.onClick(data)}
        isChecked={data.checked}
        leftText={leftText}
        checkedImage={
          <Image
            style={{ tintColor: '#6495ED' }}
            source={require('./images/ic_check_box.png')}
          />
        }
        unCheckedImage={
          <Image
            style={{ tintColor: '#6495ED' }}
            source={require('./images/ic_check_box_outline_blank.png')}
          />
        }
      />
    )
  }

  onBack() {
    if (this.changeValue.length === 0) {
      this.props.navigator.pop()
      return
    }
    Alert.alert('提示', '需要保存修改吗？', [
      {
        text: '不保存',
        onPress: () => {
          this.props.navigator.pop()
        },
        style: 'cancel'
      },
      {
        text: '保存',
        onPress: () => {
          this.onSave()
        }
      }
    ])
  }

  render() {
    let rightButton = (
      <TouchableOpacity onPress={() => this.onSave()}>
        <View style={{ margin: 10 }}>
          <Text style={styles.title}>保存</Text>
        </View>
      </TouchableOpacity>
    )
    return (
      <View style={styles.container}>
        <NavigationBar
          title={'自定义标签'}
          statusBar={{
            backgroundColor: '#6495ED'
          }}
          leftButton={ViewUtils.getLeftButton(() => this.onBack())}
          rightButton={rightButton}
        />
        <ScrollView>{this.renderView()}</ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  tips: {
    fontSize: 29
  },
  title: {
    fontSize: 18,
    color: 'white'
  },
  line: {
    height: 0.3,
    backgroundColor: 'darkgray'
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center'
  }
})
