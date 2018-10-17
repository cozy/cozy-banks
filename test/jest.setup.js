import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

global.mount = mount
global.shallow = shallow
global.cozy = {
  bar: {
    BarLeft: () => null,
    BarRight: () => null
  }
}
