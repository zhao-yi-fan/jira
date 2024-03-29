import qs from 'qs';
import * as auth from 'auth-provider';
import { useAuth } from 'context/auth-context';
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}
export const http = (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === 'GET') {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: '请重新登录' });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(await response.json());
      }
    });
};

// JS 中的typeof 是在runtime时运行的
// return typeof 1 ==='number'

// TS 中的typeof 是在静态环境运行的
// return (...[endpoint, config]: Parameters<typeof http>) =>
export const useHttp = () => {
  const { user } = useAuth();
  // Utility Types 的用法： 用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};

// 交叉类型
// let myFavoriteNumber: string & number;
// 联合类型
/* let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7; */
// 不能将类型“{}”分配给类型“string | number”。ts(2322)
// myFavoriteNumber = {}
// let jackFavoriteNumber: string | number;

// 类型别名在很多情况下可以和interface互换
// interface Person {
//   name: string;
// }
// type Person = { name: string };
// const xiaoMing: Person = { name: "xiaoming" };

// 1、类型别名, interface 在这种情况下没法替代type
/* type FavoriteNumber = string | number;
let roseFavoriteNumber: FavoriteNumber = '6'; */

//2、 interface 无法实现Utility Types
/* type Person = {
  name: string;
  age: number;
};
// 在不改变原有type下，Partial可以让type中的属性都是可选的
const xiaoMing: Partial<Person> = {};
// 在不改变原有type下，Omit可以让type的某些属性删除
const shenMiRen: Omit<Person, 'name' | 'age'> = { age: 11 }; */
