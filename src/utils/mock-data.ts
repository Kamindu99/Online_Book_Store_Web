// third-party
import { sub } from 'date-fns';
import { Chance } from 'chance';
import lodash from 'lodash';

const chance = new Chance();

export const range = (len: number) => {
  const arr = [];
  for (let i = 0; i < len; i += 1) {
    arr.push(i);
  }
  return arr;
};

const skills = [
  'UI Design',
  'Mobile App',
  'Web App',
  'UX',
  'Wireframing',
  'Prototyping',
  'Backend',
  'React',
  'Angular',
  'Javascript',
  'HTML',
  'ES6',
  'Figma',
  'Codeigniter'
];

const time = ['just now', '1 day ago', '2 min ago', '2 days ago', '1 week ago', '1 year ago', '5 months ago', '3 hours ago', '1 hour ago'];
const modulenames = ['2024-01-02'];
const menuname = ['Menu Action List', 'Dashboard', 'Users', 'Role Creation'];
const menuaction = ['CREATE', 'VIEW'];
const keyvalue = ['0 -Code ID', '1 -NIC'];
const url = ['/user-management/menu-action-list', '/user-management/dashboard', '/user-management/user-list', '/user-management/role-creation'];
const date = ['2023-09-13', '2023-09-18', '2023-02-10', '2023-01-05'];
const activitytime = ['15:43:36', '15:43:20', '15:43:30', '	14:43:36', '15:40:36'];
const deptname = ['Default'];
const rolenames = ['Madol Duwa', 'Hath Pana'];
const nic = ['997654232V', '923543129V', '976543459V', '934254765V', '199817302837', '209817302837'];
const policytype = ['Motor'];
const product = ['Fire'];
const locationcode = ['Loc1', 'Loc2', 'Loc3', 'Loc4'];
const locationname = ['MC', 'Kandy', 'Colombo', 'Galle'];
const locationdesc = ['Magestic City', 'Kandy', 'Colombo', 'Galle'];
const province = ['Western', 'Central', 'Western', 'Southern'];
const descrict = ['Colombo', 'Kandy', 'Colombo', 'Galle'];



function mockData(index: number) {
  return {
    id: (index: number) => `${chance.bb_pin()}${index}`,
    email: chance.email({ domain: 'gmail.com' }),
    contact: chance.phone(),
    datetime: sub(new Date(), {
      days: chance.integer({ min: 0, max: 30 }),
      hours: chance.integer({ min: 0, max: 23 }),
      minutes: chance.integer({ min: 0, max: 59 })
    }),
    boolean: chance.bool(),
    role: chance.profession(),
    company: chance.company(),
    address: {
      full: `${chance.address()}, ${chance.city()}, ${chance.country({ full: true })} - ${chance.zip()}`,
      country: chance.country({ full: true })
    },
    name: {
      first: chance.first(),
      last: chance.last(),
      full: chance.name(),
    },
    text: {
      title: chance.sentence({ words: chance.integer({ min: 4, max: 12 }) }),
      sentence: chance.sentence(),
      description: chance.paragraph,
    },
    number: {
      percentage: chance.integer({ min: 0, max: 100 }),
      rating: chance.floating({ min: 0, max: 5, fixed: 2 }),
      status: (min: number, max: number) => chance.integer({ min, max }),
      age: chance.age(),
      amount: chance.integer({ min: 1, max: 10000 })
    },
    image: {
      product: (index: number) => `product_${index}`,
      avatar: (index: number) => `avatar_${index}`
    },
    skill: lodash.sampleSize(skills, chance.integer({ min: 2, max: 6 })),
    time: lodash.sampleSize(time),
    modulename: lodash.sampleSize(modulenames, chance.integer({ min: 2, max: 4 })),
    menuname: lodash.sampleSize(menuname),
    menuaction: lodash.sampleSize(menuaction),
    url: lodash.sampleSize(url),
    keyvalue: lodash.sampleSize(keyvalue),
    date: lodash.sampleSize(date),
    activitytime: lodash.sampleSize(activitytime),
    deptname: lodash.sampleSize(deptname),
    rolename: lodash.sampleSize(rolenames),
    nic: lodash.sampleSize(nic),
    policytype: lodash.sampleSize(policytype),
    product: lodash.sampleSize(product),
    locationcode: lodash.sampleSize(locationcode),
    locationname: lodash.sampleSize(locationname),
    locationdesc: lodash.sampleSize(locationdesc),
    province: lodash.sampleSize(province),
    descrict: lodash.sampleSize(descrict)


  };
}

export default mockData;
