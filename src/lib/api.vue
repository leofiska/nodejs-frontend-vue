<template>
  <div>
  </div>
</template>

<script>
export default {
  name: 'api',
  props: [ 'token' ],
  data () {
    return {
      ready: false,
      bindings: [],
      subscriptions: [],
      loading: false,
      socket: null,
      url: 'wss://project-1.zxe.com.br/api',
      createSocket: function () {
        this.socket = null
        delete this.socket
        try {
          this.socket = new WebSocket(this.url)
        } catch (e) {
          setTimeout(this.createSocket.bind(this), 500)
          return
        }
        this.socket.onopen = () => {
          if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
            this.send({f: 'auth', token: localStorage.getItem('token')}, true)
          } else {
            this.ready = true
          }
          for (var i = 0; i < this.subscriptions.length; i++) {
            this.subscribe(this.bindings[i].method, { f: 'subscribe' }, this.bindings[i])
          }
        }
        this.socket.onmessage = (e) => {
          try {
            var obj = JSON.parse(e.data)
            this.executeServerMessage(obj)
          } catch (e) {
          }
        }
        this.socket.onclose = (e) => {
          this.ready = false
          console.log('connection closed: ' + e.code)
          setTimeout(this.createSocket.bind(this), 300)
        }
        this.socket.onerror = (e) => {
          this.ready = false
          console.log('error')
          this.socket.onclose = function () {}
          this.socket.close()
          setTimeout(this.createSocket.bind(this), 300)
        }
      },
      send: function (f, forced) {
        if (((forced !== undefined && forced === true) || this.ready === true) &&
          this.socket &&
          this.socket !== null &&
          this.socket !== undefined &&
          this.socket.send !== undefined &&
          this.socket.readyState === this.socket.OPEN) {
          try {
            this.socket.send(JSON.stringify(f))
          } catch (e) {
            console.log('exception while sending message to backend')
          }
        } else {
          // socket is not ready to send messages, reschedule
          // console.log('socket not ready, rescheduling')
          setTimeout(this.send.bind(this), 50, f)
        }
      },
      executeServerMessage: function (obj) {
        switch (obj.f) {
          case 'auth':
            if (obj.error !== false) {
              localStorage.removeItem('token')
              this.$router.push('/')
            } else {
              this.ready = true
              this.$emit('setToken', localStorage.getItem('token'))
            }
            break
          case 'login':
            if (obj.auth === true) {
              localStorage.setItem('token', obj.content.token)
              this.$emit('setToken', localStorage.getItem('token'))
              this.$router.push('/')
            } else {
              console.log(obj)
            }
            break
          case 'logout':
            if (obj.error === false) {
              localStorage.removeItem('token')
              localStorage.removeItem('id')
              this.$emit('setToken', null)
              this.$router.push('/')
            } else {
              console.log(obj)
            }
            break
          case 'fetch':
            if (obj.error === false) {
              if (this.bindings[obj.tid - 1] !== undefined && this.bindings[obj.tid - 1] !== null) {
                this.bindings[obj.tid - 1].f(obj).bind(this.bindings[obj.tid - 1].context)
              }
            } else {
              console.log(obj)
            }
            break
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
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) return false
      this.send({ f: 'logout', token: localStorage.getItem('token') })
    },
    fetch: function (method, options, el) {
      if (el.obj.tid < 0) {
        el.obj.tid = this.bindings.push(el)
      }
      this.send({ f: method, options: options, tid: el.obj.tid })
    },
    subscribe: function (method, options, el) {
      if (el.obj.tid < 0) {
        el.obj.tid = this.bindings.push(el)
        this.subscriptions.push(el.obj.tid)
      }
      this.send({ f: method, options: options, tid: el.obj.tid })
    },
    unsubscribe: function (method, options, el) {
      this.bindings.splice(el.obj.tid, 1)
      this.subscriptions.splice(this.bindings.indexOf(el.obj.tid))
      this.send({ f: method, options: options, tid: el.obj.tid })
    }
  }
}
</script>
