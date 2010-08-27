var model = { init: function(m) { m.model('User', {

  properties: [
    'created_at',
    'updated_at'
  ],

  methods: {
    save: function(fn) {
      if(this.isNew) this.created_at = new Date();
      this.updated_at = new Date();
      this.__super__(fn);
    }
  }

});}}; exports.init = model.init;