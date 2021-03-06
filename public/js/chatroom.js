angular.module('chatapp', [])

angular.module('chatapp').factory('socket', function($rootScope) {
  // var socket = io.connect('/')
  //为了避免跨域请求，需要将原来的var socket = io.connect('/')改成下面这一行
  // var socket = io.connect('http://localhost:3000/')
  //或者采用socket官方主页上面的方法 var socket = io()
  var socket = io();
  return {
    on: function(eventName, callback) {
      socket.on(eventName, function() {
        var args = arguments
        $rootScope.$apply(function() {
          callback.apply(socket, args)
        })
      })
    },
    emit: function(eventName, data, callback) {
      socket.emit(eventName, data, function() {
        var args = arguments
        $rootScope.$apply(function() {
          if (callback) {
            callback.apply(socket, args)
          }
        })
      })
    }
  }
})

angular.module('chatapp').directive('ctrlEnterBreakLine', function() {
  return function(scope, element, attrs) {
    var ctrlDown = false
    element.bind("keydown", function(evt) {
      if (evt.which === 17) {
        ctrlDown = true
        setTimeout(function() {
          ctrlDown = false
        }, 1000)
      }
      if (evt.which === 13) {
        if (ctrlDown) {
          element.val(element.val() + '\n')
        } else {
          scope.$apply(function() {
            scope.$eval(attrs.ctrlEnterBreakLine);
          });
          evt.preventDefault()
        }
      }
    });
  };
});

angular.module('chatapp').controller('MessageCreatorCtrl', function($scope, socket) {
  $scope.createMessage = function () {
    // if ($scope.newMessage = '') {
    //   return
    // }
    socket.emit('createMessage', $scope.newMessage)
    $scope.newMessage = ''
  }
})

angular.module('chatapp').directive('autoScrollToBottom', function() {
  return {
    link: function(scope, element, attrs) {
      scope.$watch(
        function() {
          return element.children().length;
        },
        function() {
          element.animate({
            scrollTop: element.prop('scrollHeight')
          }, 1000);
        }
      );
    }
  };
});

angular.module('chatapp').controller('RoomCtrl', function($scope, socket) {
  $scope.messages = []
  socket.emit('getAllMessages')
  socket.on('allMessage', function (messages) {
    $scope.messages = messages
  })
  socket.on('messageAdded', function (message) {
    $scope.messages.push(message)
  })
})