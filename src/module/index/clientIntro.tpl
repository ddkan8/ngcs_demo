<div class="userInfoItem show">
    <!--<div class="topSc"></div>-->
    <div class="flr">
        <!--<div class="actionItems">
            <a href="javascript:void(0);" desc-tip="结束服务" class="hangUp"></a>
            <a href="javascript:void(0);" desc-tip="释放" class="mute"></a>
            <a href="javascript:void(0);" desc-tip="密码验证" class="validation"></a>
            <a href="javascript:void(0);" desc-tip="收藏" class="favorites"></a>
            <a href="javascript:void(0);" desc-tip="服务小结" class="acceptRequest"></a>
            <a href="javascript:void(0);" desc-tip="结束请求" class="close"></a>
        </div>-->
        <!--<div class="msgItems">
            <div>
                <b class="sms"></b>
                <span class="bubble strong">1</span>
            </div>
            <div>
                <b class="text"></b>
                <span class="bubble strong">3</span>
            </div>
            <div>
                <b class="feedback"></b>
                <span class="bubble strong">2</span>
            </div>
        </div>-->
        <div class="serviceT">
            <i></i>
            <span>00:00:00</span>
        </div>
    </div>
    <div class="leftSc"></div>
    <div class="photo"></div>
    <div class="info">
        <p>
            <span class="name">{{name}}</span>
            <!--<span class="appellation">女士</span>-->
        </p>
        <!-- <p class="userStar">
            <span class="star {{#if_gt starLevel compare=0}}starCur{{/if_gt}}"></span>
            <span class="star {{#if_gt starLevel compare=1}}starCur{{/if_gt}}"></span>
            <span class="star {{#if_gt starLevel compare=2}}starCur{{/if_gt}}"></span>
            <span class="star {{#if_gt starLevel compare=3}}starCur{{/if_gt}}"></span>
            <span class="star {{#if_gt starLevel compare=4}}starCur{{/if_gt}}"></span>
        </p> -->
    </div>
    <div class="info">
        <!-- <span class="account">{{phoneNum}} <span class="icon"></span></span> -->
        <!-- <p class="pkgCur">{{meal}} </p> -->
        <select name="" id="">
            <option value="" selected="selected">
                {{phoneNum}} 
            </option>
        </select>
    </div>
    <div class="info">
        <p class="userLocal">{{region}} </p>
        <!-- <p class="feeState">{{state}} </p> -->
    </div>
    <div class="info bol">
        <p class="typesTool">
            <span class="sms{{#if_eq channel compare=1}} appCur{{/if_eq}}"></span>
            <span class="weixin{{#if_eq channel compare=2}} appCur{{/if_eq}}"></span>
            <span class="weibo{{#if_eq channel compare=3}} appCur{{/if_eq}}"></span>
            <span class="feixin{{#if_eq channel compare=4}} appCur{{/if_eq}}"></span>
            <span class="email{{#if_eq channel compare=5}} appCur{{/if_eq}}"></span>
        </p>
        <!-- <p class="moreInfo"><a>更多客户信息<span></span></a></p> -->
    </div>
    <ul class="usericons">
        <li class="space-line"></li>
        <li class="ic_tag"></li>
        <li class="space-line"></li>
        <li class="ic_edit"></li>
        <li class="ic_share"></li>
        <li class="ic_flower"></li>
        <li class="ic_hangup"></li>
    </ul>
</div>

