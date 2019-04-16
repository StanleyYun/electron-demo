<g:set var="username" value="login"/>
<!-- Button trigger modal -->
<a href="#" type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal"
   xmlns:g="http://www.w3.org/1999/xhtml" xmlns:g="http://www.w3.org/1999/xhtml" xmlns:g="http://www.w3.org/1999/xhtml"
   xmlns:g="http://www.w3.org/1999/xhtml">
    登录
</a>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class="modal-dialog" role="document">
        <g:form class="ajaxFrom">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">用户登录</h4>
            </div>
            <div class="modal-body">
                <label for="username" class="sr-only">账号</label>
                <input type="text" id="username" name="username" class="form-control" placeholder="username" required autofocus style="margin-bottom: 10px">
                <label for="inputPassword" class="sr-only">密码</label>
                <input type="password" id="password" name="password" class="form-control" placeholder="Password" required>
            </div>
            <div class="modal-footer">
                <button class="btn btn-lg btn-primary btn-block" type="button" id="login">登录</button>
            </div>
        </div>
        </g:form>
    </div>
</div>