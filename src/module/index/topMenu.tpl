<div class="shortBox">
  <div class="navLeftMenu">
    <div class="search"> <a href=javascript:; class="sBtn"> <span class="sBtnRight"> <span class="sBtnCenter">
      <input>
      <span class="tigger"></span> </span> </span> </a> </div>
    <div class="topNavMenu">
      <ul>
        <!-- <li class="selected">服务请求</li> -->
        {{#if beans.length}}
          {{#each beans}}
          <li menuId="{{menuId}}">{{menuName}}</li>
          {{/each}}
        {{else}}
          <li>对不起，没有菜单。</li>
        {{/if}}
      </ul>
    </div>
  </div>
  <div class="navRightMenu">
    {{#each beans}}
      <div class="menuItem">
        <h3 class="title">{{menuName}}</h3>
        {{#each secondMenu}}
          <div class="subMenu">
            <dl>
              <dt>{{menuName}}</dt>
              <dd>
                <ul>
                  {{#each thirdMenu}}
                    <li> <a href=javascript:;>{{menuName}}</a> </li>
                  {{/each}}
                </ul>
              </dd>
            </dl>
          </div>
        {{/each}}
      </div>
    {{/each}}
</div>
