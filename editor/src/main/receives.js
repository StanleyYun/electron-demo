const amqp = require('amqplib/callback_api');
amqp.connect('amqp://guest:guest@xjy0.cn', function (err, conn) {
    conn.createChannel(function(err, ch) {
        var q = 'testQueue';
    
        ch.assertQueue(q, {durable: false});
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function(msg) {
          console.log(" [x] Received %s", msg.content.toString());
        }, {noAck: true});
    });
});