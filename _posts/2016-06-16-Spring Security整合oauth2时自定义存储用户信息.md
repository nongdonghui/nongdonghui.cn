---
layout: post
title: Spring Security整合oauth2时自定义存储用户信息
categories: spring
lastUpdated:
---

## {{ page.title }}

{{ page.date | date: "%Y.%-m.%-d" }} - 南京 | <a href="/archive#{{ page.categories }}">{{ page.categories}}</a>

当我们校验成功获取令牌之后，在后台可以通过如下方法获取用户名信息

```java
public String getCurrentUsername() {
  Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();  
  if (principal instanceof UserDetails) {
     return ((UserDetails) principal).getUsername();
  }
  if (principal instanceof Principal) {
     return ((Principal) principal).getName();
  }
  return String.valueOf(principal);
}
```

或者更简便的方法

```java
public String getCurrentUsername() {
  return SecurityContextHolder.getContext().getAuthentication().getName();
}
```

其中，UserDetails就是存放用户信息的，当通过验证后，把用户信息封装成Authentication添加到SecurityContextHolder所持有的SecurityContext中，供后续的程序进行调用，如访问权限的鉴定等。

如果我们要保存一些更多的信息，可以自定义一个UserDetails，然后在自定义的Service里实现UserDetailsService的loadUserByUsername方法的时候，把额外信息添加到自定义的UserDetails中

如

```java
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("accountUserService")
@Transactional
public class AccountUserService implements UserDetailsService {
  
  @Autowired
  private AccountManager accountManager;
  
  @Override
  public UserDetails loadUserByUsername(String username)
      throws UsernameNotFoundException {
    
    Account account = accountManager.findByCode(username);
    
    if (account != null) {
      List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
      authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
      
      com.my.model.UserDetails userDetails = new com.my.model.UserDetails(account.getAccountCode(), account.getPassword(), authorities);
      
      AccountDetail accountDetail = accountManager.getAccountDetail(username);
      
      userDetails.setAccountDetail(accountDetail);
      
      return userDetails;
    }
    
    throw new UsernameNotFoundException("User '" + username + "' not found.");
  }

}
```

**更新列表：**

*



**参考文章：**

* [Spring Security（03）——核心类简介][1]
* [Spring Security（04）——认证简介][2]


[1]: http://haohaoxuexi.iteye.com/blog/2155786
[2]: http://haohaoxuexi.iteye.com/blog/2156765