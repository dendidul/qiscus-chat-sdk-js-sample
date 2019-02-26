define([
  'jquery',
  'service/qiscus', 'service/route', 'service/emitter', 'service/content',
  'pages/login', 'pages/chat-list', 'pages/chat',
  'pages/users'
], function (
  $, qiscus, route, emitter, $content,
  LoginPage, ChatListPage, ChatPage, UserPage
) {
  window.route = route
  window.qiscus = qiscus
  var routes = [LoginPage, ChatListPage, ChatPage, UserPage]

  $content.html(LoginPage)
  if (!qiscus.isLogin) {
    route.replace('/login')
  } else {
    route.replace('/chat')
  }

  emitter.on('qiscus::login-success', function () {
    route.replace('/chat')
  })
  emitter.on('route::change', function (location) {
    var content = routes.find(function (page) {
      return page.path === location.pathname
    })
    $content.html(content(location.state))
  })
})
