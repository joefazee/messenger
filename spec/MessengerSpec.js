// Generated by CoffeeScript 1.3.3
(function() {
  var afterEachFunc, beforeEachFunc, gm, spies, test_msg;

  gm = null;

  test_msg = 'light it up';

  spies = null;

  beforeEachFunc = function() {
    spies = [];
    return gm = $.globalMessenger();
  };

  afterEachFunc = function() {
    var spy, _i, _len, _results;
    gm = null;
    if (spies) {
      _results = [];
      for (_i = 0, _len = spies.length; _i < _len; _i++) {
        spy = spies[_i];
        if (spy) {
          try {
            _results.push(spy.restore());
          } catch (error) {

          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    }
  };

  describe('the global messenger', function() {
    beforeEach(beforeEachFunc);
    afterEach(afterEachFunc);
    it('should be totally awesome', function() {
      var itTotallyIs;
      itTotallyIs = true;
      return expect(itTotallyIs).toBe(true);
    });
    it('should create a new message on post', function() {
      var msg, newMessageSpy;
      newMessageSpy = sinon.spy(gm, 'newMessage');
      spies.push(newMessageSpy);
      msg = gm.post(test_msg);
      return expect(newMessageSpy.called).toBeTruthy();
    });
    return it('should be able to hide all messages', function() {
      var msg1, msg2, spy1, spy2, yeahBuddy;
      yeahBuddy = 'cabs are ';
      msg1 = gm.post(yeahBuddy + ' here');
      msg2 = gm.post(yeahBuddy + ' not here');
      spy1 = sinon.spy(msg1, 'hide');
      spy2 = sinon.spy(msg2, 'hide');
      gm.hideAll();
      expect(spy1.called).toBeTruthy();
      return expect(spy2.called).toBeTruthy();
    });
  });

  describe('a message', function() {
    beforeEach(beforeEachFunc);
    afterEach(afterEachFunc);
    it('should cancel timers on cancel', function() {
      var msg, spy;
      msg = gm.post(test_msg);
      spy = sinon.spy(msg, 'clearTimers');
      spies.push(spy);
      msg.cancel();
      return expect(spy.called).toBeTruthy();
    });
    it('should fire events properly', function() {
      var eventName, fulfilled, msg;
      msg = gm.post(test_msg);
      fulfilled = false;
      eventName = 'wtf_mate';
      msg.on(eventName, function() {
        return expect(true).toBeTruthy();
      });
      return msg.trigger('wtf_mate');
    });
    it('should re-render a message on update', function() {
      var msg, renderSpy;
      msg = gm.post(test_msg);
      renderSpy = sinon.spy(msg, 'render');
      spies.push(renderSpy);
      msg.update({
        message: test_msg
      });
      return expect(renderSpy.called).toBeTruthy();
    });
    it('should trigger update event on update', function() {
      var msg, triggerSpy;
      msg = gm.post(test_msg);
      triggerSpy = sinon.spy(msg, 'trigger');
      spies.push(triggerSpy);
      msg.update({
        message: test_msg
      });
      return expect(triggerSpy.calledWith('update')).toBeTruthy();
    });
    it('should trigger hide event on hide', function() {
      var msg, spy;
      msg = gm.post(test_msg);
      spy = sinon.spy(msg, 'trigger');
      spies.push(spy);
      msg.hide();
      return expect(spy.calledWith('hide')).toBeTruthy();
    });
    return it('should be able to be scrolled to', function() {
      var msg, spy;
      msg = gm.post(test_msg);
      $.scrollTo = function() {};
      spy = sinon.stub($, 'scrollTo');
      spies.push(spy);
      msg.scrollTo();
      return expect(spy.called).toBeTruthy();
    });
  });

}).call(this);
