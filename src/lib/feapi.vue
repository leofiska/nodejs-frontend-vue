<script>
const app = function (store) {
  return {
    store: store,
    bindings: [],
    subscriptions: [],
    loading: false,
    socket: null,
    url: 'wss://project-1.zxe.com.br/api',
    createSocket: function () {
      try {
        this.socket = new WebSocket(this.url)
      } catch (e) {
        setTimeout(this.createSocket.bind(this), 500)
        return
      }
      this.socket.onopen = () => {
        console.log('ws connected')
        if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
          console.log('sending auth: ' + localStorage.getItem('token'))
          this.send({f: 'auth', token: localStorage.getItem('token')}, true)
        } else {
          this.store.$store.dispatch('set_online', true)
        }
      }
      this.socket.onmessage = (e) => {
        try {
          var obj = JSON.parse(e.data)
          this.executeServerMessage(obj).bind(this)
        } catch (e) {
        }
      }
      this.socket.onclose = (e) => {
        if (this.$store !== undefined) {
          this.store.$store.dispatch('set_online', false)
        }
        console.log('connection closed: ' + e.code)
        setTimeout(this.createSocket.bind(this), 300)
      }
      this.socket.onerror = (e) => {
        this.store.$store.dispatch('set_online', false)
        console.log('error')
        this.socket.onclose = function () {}
        this.socket.close()
        setTimeout(this.createSocket.bind(this), 300)
      }
    },
    send: function (f, forced) {
      if (((forced !== undefined && forced === true) || this.store.$store.state.online === true) &&
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
            this.store.$store.dispatch('set_online', true)
          }
          break
        case 'login':
          if (obj.auth === true) {
            localStorage.setItem('token', obj.content.token)
            this.$router.push('/')
          } else {
            console.log(obj)
          }
          break
        case 'logout':
          if (obj.error === false) {
            localStorage.removeItem('token')
            localStorage.removeItem('id')
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
    },
    login: function (id, pass) {
      if (this.$store.state.ws === null) return
      if (id === undefined || pass === undefined || id === '' || pass === '') return false
      this.send({ f: 'login', id: id, pass: pass })
    },
    logout: function () {
      if (this.$store.state.ws === null) return
      if (localStorage.getItem('token') === null || localStorage.getItem('token') === undefined) return false
      this.send({ f: 'logout', token: localStorage.getItem('token') })
    },
    fetch: function (method, options, el) {
      if (this.$store.state.ws === null) return
      if (el.obj.tid < 0) {
        el.obj.tid = this.bindings.push(el)
      }
      this.ws.send({ f: method, options: options, tid: el.obj.tid })
    },
    subscribe: function (method, options, el) {
      if (this.$store.state.ws === null) return
      if (el.obj.tid < 0) {
        el.obj.tid = this.bindings.push(el)
        this.subscriptions.push(el.obj.tid)
      }
      this.send({ f: method, options: options, tid: el.obj.tid })
    },
    unsubscribe: function (method, options, el) {
      if (this.$store.state.ws === null) return
      this.bindings.splice(el.obj.tid, 1)
      this.subscriptions.splice(this.bindings.indexOf(el.obj.tid))
      this.send({ f: method, options: options, tid: el.obj.tid })
    }
  }
}

export default {
  install: function (Vue) {
    Vue.mixin({
      mounted () {
        if (this.$store.state.ws === null) {
          this.$store.dispatch('update_ws', app(this))
        }
      }
    })
    Vue.prototype.$api = {
      login: function (id, pass) {
        if (this.$store.state.ws === null) return
        this.$store.state.ws.login(id, pass)
      },
      logout: function () {
        if (this.$store.state.ws === null) return
        this.$store.state.ws.logout()
      },
      fetch: function (method, options, el) {
        if (this.$store.state.ws === null) return
        this.$store.state.ws.fetch(method, options, el)
      },
      subscribe: function (method, options, el) {
        if (this.$store.state.ws === null) return
        this.$store.state.ws.subscribe(method, options, el)
      },
      unsubscribe: function (method, options, el) {
        if (this.$store.state.ws === null) return
        this.$store.state.ws.unsubscribe(method, options, el)
      }
    }
  }
}
</script>
