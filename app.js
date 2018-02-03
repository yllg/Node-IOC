//帮助实现DI依赖注入的库
const awilix = require('awilix');

// Create the container and set the injectionMode to PROXY (which is also the default).
//创建一个容器 实现将model注入的方式
const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
})



//实现一个model
// Let's try with a factory function.
const makeUserService = () => {
    //这个东西就是一个服务，为了将来注入用的
    return {
      getUser: id => {
        return id + 44;
      }
    }
  }

  //将model方法，注册到最开始的this.userService中
  container.register({
    // 方法就是asFunction直接传递，如果是类用asClass先new一个再传哦
    //这里是被定义成一个方法; 把电话号码放进电话本了
    userService: awilix.asFunction(makeUserService)
  })


//实现一个基本的controller
class UserController {
  // We are using constructor injection.
  //以后注入的方式 都是通过controller，它将实例化的类注入到你的类中
  constructor(opts) {
      // Save a reference to our dependency.
      //构建一个userService = 参数里注入的userService
      this.userService = opts.userService
  }
  // 发起一个打电话的过程哦
  getUser(ctx) {
      return this.userService.getUser(22)
  }
}


//注册进最开始的容器container中
container.register({
  userController: awilix.asClass(UserController)
})

  //最后执行node app.js 可以看到结果是66哦
  console.log(container.resolve('userController').getUser());



