module.exports = function (app) {
    
    var ShippingModel = {
        
        getTrackingCorreios:  function(callback){

            var query = "select * from tracking_01 where pro = 'N'  order by rand() limit 1 ;";

            app.connection.query(query, function(err, rows, fields){

                if (err) throw err;
                
                //return list
                callback(rows);
            });
        },
        
    };

    return ShippingModel;
};