package learngrails

class User {


    String username;
    String password;
    String rolename = "普通用户";
    String realname= "匿名";

    Date dateCreated;
    Date lastUpdated;

    static constraints = {
        username(nullable: false, blank: false, unique: true)
        password(nullable: false, blank: false)
        realname(nullable: false, blank: true)
        rolename(nullable: false, blank: true, inList: ["普通用户","管理员"])
    }
    static mapping = {
        table: "user"
        id column: "id"
        version column: "version"

        username column: "username"
        password column: "password"
        rolename column: "rolename"
        realname column: "realname"

        dateCreated column: "dateCreated"
        lastUpdated column: "lastUpdate"

        sort id: "desc"
    }
    static void init() {
        def user = User.first()
        if (! user) {
            user = new User([username:"admin", password:"123456", realname: "stanley", rolename:"管理员"])
           user.save(flush: true)
        }
    }
}
