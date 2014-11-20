(function($,window,document,undefined){
    $.notify = function(msg, options){
        options = options || {};
        var template = [''],
            container = $('._notification-container').length?$('._notification-container'):$('<div class="_notification-container" />').appendTo('body'),
            position = options.position || "top right",
            delay = options.delay==undefined?5:options.delay,
            notification = $('<div class="_notification"><div class="_msg"></div></div>'),
            type = options.type || 'info',
            icon = "";
        
        switch(type){
            case 'success':
                icon = " fa-check-circle";
                break;
            case 'warning':
                icon = "fa-exclamation-triangle";
                break;
            case 'error':
                icon = "fa-times-circle";                
                break;
            default:
                icon = "fa-info-circle";
                break;
        }
        
        if(typeof msg === "object")
            notification.find('._msg').append(msg);
        else
            notification.find('._msg').html(msg);
        
        notification.prepend('<i class="fa fa-2x '+icon+'"/> ');
        notification.addClass(type).appendTo(container);
        container.removeClass('top right bottom left').addClass(position);
        notification.fadeIn();
        notification.close = function(){
            this.fadeOut(function(){
                this.remove();
                if(!container.find('._notification').length)
                container.remove();
            });
        };
        notification.on('click', function(){
            notification.close();
        });
        if(delay>0)
        setTimeout(function(){
            notification.close();
        }, delay*1000);
        
        return notification;
    };
})(jQuery, window, document);
