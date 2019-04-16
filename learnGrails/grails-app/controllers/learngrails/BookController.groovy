package learngrails

import com.budjb.rabbitmq.publisher.RabbitMessagePublisher
import grails.converters.JSON
import sun.misc.BASE64Decoder

import static org.springframework.http.HttpStatus.*

class BookController {

    def index() { }

    /**
     * User login
     * @param username
     * @param password
     * @return
     */
    def login(String username, String password) {
        print(password)
        print(params)
        def result = [
                code: 200,
                message:'登录成功！'
        ]
        if (username && password) {
            def user = User.findByUsername(username)
            if (user) {
                if(user.password == password) {
                    session.uid = user.id
                    session.setMaxInactiveInterval(36000);
                } else {
                    result['code'] = 403
                    result['message'] = "用户和密码错误"
                }
                render result as JSON
                return
            } else {
                render status:BAD_REQUEST, text:'用户不存在'
            }
            return
        } else {
            render '[code: 403, message:\'用户和密码不能为空！\']' as JSON
        }
    }

    def logout() {
        session.invalidate()
        redirect(url: "/")
    }

    def upload(String file, String filename, String event){
        //ef lfile = new File('./a.txt');
        if (event != 'deleted') {
            byte[] buffer = new BASE64Decoder().decodeBuffer(file);
            for(int i=0;i<buffer.length;++i)
            {
                if(buffer[i]<0)
                {//调整异常数据
                    buffer[i]+=256;
                }
            }
            FileOutputStream out = new FileOutputStream('upload/' + filename);
            out.write(buffer);
            out.close();
        } else {
            File dFile = new File('upload/' + filename);
            if(dFile.exists()) {
                dFile.delete();
            }
        }
        render status:ACCEPTED, text:'success'
        return ;
    }

    RabbitMessagePublisher rabbitMessagePublisher

    def sendSomeMessage(String message) {
        rabbitMessagePublisher.send {
            exchange = "test"
            body = message
        }
        render 'success';
    }

}
