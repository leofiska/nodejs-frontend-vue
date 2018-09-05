<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'api',
  data () {
    return {
      loading: false,
      socket: null,
      url: 'wss://xoustaki.zxe.com.br',
      createSocket: function () {
        this.socket = null
        delete this.socket
        try {
          this.socket = new WebSocket(this.url)
        } catch (e) {
          setTimeout(this.createSocket, 500)
          return
        }
        this.socket.onopen = () => {
          if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
            this.send({f: 'auth', token: localStorage.getItem('token')})
            console.log(localStorage.getItem('token'))
          }
        }
        this.socket.onmessage = (e) => {
          // if (this.socket.readyState !== this.socket.OPEN) return
          try {
            var obj = JSON.parse(e.data)
            this.executeServerMessage(obj)
          } catch (e) {
          }
        }
        this.socket.onclose = (e) => {
          console.log('connection closed: ' + e.code)
          switch (e.code) {
            case 1006:
              this.createSocket()
              break
            default:
              setTimeout(this.createSocket, 300)
              break
          }
        }
        this.socket.onerror = (e) => {
          console.log('error')
          this.socket.onclose = function () {}
          this.socket.close()
          this.createSocket()
        }
      },
      send: function (f) {
        if (!this.socket || this.socket == null || this.socket === undefined || this.socket.send === undefined) {
          setTimeout(this.send, 500, f)
        } else {
          try {
            this.socket.send(JSON.stringify(f))
          } catch (e) {
            setTimeout(this.send, 500, f)
          }
        }
      },
      executeServerMessage: (obj) => {
        var i = 0
        switch (obj.f) {
          case 'auth':
            if (obj.error !== 0) {
              localStorage.removeItem('token')
              this.$router.push('/home')
            }
            break
          case 'login':
            if (obj.auth === true) {
              localStorage.setItem('token', obj.content.token)
              this.$router.push('/home')
            } else {
              alert(obj.error)
            }
            break
        }
        if (obj.alert !== undefined) {
          for (i = 0; obj.alert[i] !== undefined; i++) {
            setAlert(obj.alert[i])
          }
        }
        if (obj.badge !== undefined) {
          for (i = 0; obj.badge[i] !== undefined; i++) {
            setBadge(obj.badge[i])
          }
        }
        if (obj.reload !== undefined) {
          setTimeout(location.reload(false), obj.reload)
        }
      }
    }
  },
  mounted () {
    this.createSocket()
  },
  methods: {
    login: function (id, pass) {
      if (id === undefined || pass === undefined || id === '' || pass === '') return false
      this.send({ f: 'login', id: id, pass: pass })
    },
    logout: function () {
      this.send({ f: 'logout', token: localStorage.getItem('token') })
      localStorage.removeItem('token')
      this.$router.push('/home')
    }
  }
}

function setAlert (al) {
  console.log('alerta')
  console.log(this)
  this.$router.push('/home')
  // var message = '<div class="alert alert-dismissible alert-' + al.type + '"><button type="button" class="close" data-dismiss="alert">&times;</button>' + al.message + '</div>'
  // $('div#' + al.id).html(message)
}
function setBadge (a) {
  // var message = '<span class="badge badge-'+al.type + '">'+al.message + '</div>'
  // $('div#' + al.id).dequeue();
  // $('div#' + al.id).css('opacity',0).animate({'opacity': 1}, 200)
  // $('div#' + al.id).html(message)
  // if ( al.timeout !== undefined ) {
  // $('div#' + al.id).delay(al.timeout).css('opacity', 1).animate({'opacity': 0}, 200)
  // }
}
</script>
