/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        
        document.addEventListener("backbutton", 
								    function(e)
								    {
								        //$("#app-status-ul").append('<li>backbutton event received</li>');
							 			alert("backbutton");
							 			
							 			var hm=document.getElementById("home");
								        //if( $("#home").length > 0)
							 			
							 			if (hm.length > 0)
								        {
								            e.preventDefault();
								            pushNotification.unregister(successHandler, errorHandler);
								            navigator.app.exitApp();
								        }
								        else
								        {
								            navigator.app.backHistory();
								        }
								    }, false);
        
    },
    
    
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
//        var parentElement = document.getElementById(id);
//        var listeningElement = parentElement.querySelector('.listening');
//        var receivedElement = parentElement.querySelector('.received');
//
//        listeningElement.setAttribute('style', 'display:none;');
//        receivedElement.setAttribute('style', 'display:block;');
//
//        console.log('Received Event: ' + id);
    	
        //var c=document.getElementById('casella');
    	
		try {			
			 $("#app-status-ul").append('registrazione...');
			 
			 var pushNotification = window.plugins.pushNotification;
			 $("#app-status-ul").append('Register called...');
			 
			 pushNotification.register(this.successHandler, this.errorHandler,{"senderID":"777191909309","ecb":"app.onNotificationGCM"});
			
			
			} 
			catch (e) {
				casella.value=e.message;
			}
        
    },
    
    // result contains any message sent from the plugin call
    successHandler: function(result) {
        alert('Callback Success! Result = '+result)
    },
    
    errorHandler:function(error) {
        alert('Errore registrazione push:'+ error);
    },
 
//    onNotificationGCM: function(e) {
//    	
//    	 $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');
//    	 
//	     switch( e.event )
//	     {
//	         case 'registered':
//	             if ( e.regid.length > 0 )
//	             {
//	                 console.log("Regid " + e.regid);
//	                 alert('registration id = '+e.regid);
//	             }
//	         break;
//	
//	         case 'message':
//	           // this is the actual push notification. its format depends on the data model from the push server
//	           alert('message = '+e.message+' msgcnt = '+e.msgcnt);
//	         break;
//	
//	         case 'error':
//	           alert('GCM error = '+e.msg);
//	         break;
//	
//	         default:
//	           alert('An unknown GCM event has occurred');
//	           break;
//	     }
//	}
    
    onNotificationGCM: function(e) {
        $("#app-status-ul").append('<li>EVENT -> RECEIVED:' + e.event + '</li>');

        switch( e.event )
        {
            case 'registered':
            if ( e.regid.length > 0 )
            {
                $("#app-status-ul").append('<li>REGISTERED -> REGID:' + e.regid + "</li>");
                try{                
	                PushWoosh.appCode = "D5A0B-C19F8";
	                PushWoosh.register(e.regid, function(data) {
	                            alert("PushWoosh register success: " + JSON.stringify(data));
	                        }, function(errorregistration) {
	                            alert("Couldn't register with PushWoosh" +  errorregistration);
	                        });
                }
                catch(e){
                	 $("#app-status-ul").append('Errore registrazione:'+e.message);
                }
            }
            break;

            case 'message':
                // if this flag is set, this notification happened while we were in the foreground.
                // you might want to play a sound to get the user's attention, throw up a dialog, etc.
                if (e.foreground)
                {
                    $("#app-status-ul").append('<li>--INLINE NOTIFICATION--' + '</li>');

                    // if the notification contains a soundname, play it.
                    var my_media = new Media("/android_asset/www/"+e.soundname);
                    my_media.play();
                }
                else
                {   // otherwise we were launched because the user touched a notification in the notification tray.
                    if (e.coldstart)
                        $("#app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                    else
                    $("#app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                }

                $("#app-status-ul").append('<li>MESSAGE -> MSG: ' + e.payload.message + '</li>');
                $("#app-status-ul").append('<li>MESSAGE -> MSGCNT: ' + e.payload.msgcnt + '</li>');
            break;

            case 'error':
                $("#app-status-ul").append('<li>ERROR -> MSG:' + e.msg + '</li>');
            break;

            default:
                $("#app-status-ul").append('<li>EVENT -> Unknown, an event was received and we do not know what it is</li>');
            break;
        }
    }    
    
    
    
};
