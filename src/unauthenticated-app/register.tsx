import { Button, Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { FormEvent } from "react";
import { LongButton } from "unauthenticated-app";
/* 
interface Base {
  id: number;
}
interface Advance extends Base {
  name: string;
}

const test = (p: Base) => {}; // java: test方法的参数必须是Base类型 ts: 方法入参不必须是Base类型，只要满足Base类型就不会报错

// 鸭子类型(duck typing)：面向接口编程 而不是 面向对象编程
// const a:Advance = { id: 1, name: "jack" };
const a = { id: 1, name: "jack" };
test(a);
 */

export const LoginScreen = () => {
  const { register, user } = useAuth();

  // HTMLFormElement extends Element
  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" id={"username"} placeholder={"用户名"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input type="text" id={"password"} placeholder={"密码"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
