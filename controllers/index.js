async = require('async');

module.exports = function (app) {

   const TrackingCorreios = require('tracking-correios');
   var Shipping = app.models.shipping;

    var IndexController = {
        
        getTrackingCorreios: function (req, res) {

          Shipping.getTrackingCorreios(function(retorno) {

               retorno.forEach(function (item, index) {

                console.log(item);

                var rastreio = TrackingCorreios.track(item.tracking_id).then(function(result) {
                                                                                                            
                                                                                                            result.forEach(function (resultado, index) {

                                                                                                              if(resultado.erro)
                                                                                                              {
                                                                                                                console.log(resultado);
                                                                                                                return false;
                                                                                                              }

                                                                                                              console.log(resultado);

                                                                                                            

                                                                                                              var query = "insert into tracking_01_eventos (`id`,`sigla`,`nome`,`categoria`,`data`,`hora`,`descricao`,`local`,`codigo`,`cidade`,`uf`) VALUES ('" + resultado.numero + "','" + resultado.sigla + "','" + resultado.nome + "','" + resultado.categoria + "','" + resultado.evento[0].data + "','" + resultado.evento[0].hora + "','" + resultado.evento[0].descricao + "','" + resultado.evento[0].local + "','" + resultado.evento[0].codigo + "','" + resultado.evento[0].cidade + "','" + resultado.evento[0].uf + "');";

                                                                                                              app.connection.query(query, function(err, rows, fields){

                                                                                                                 //console.log(query);


                                                                                                                  if(rows.affectedRows == 1)
                                                                                                                  {
                                                                                                                    //console.log(query);

                                                                                                                    var query_update = "update tracking_01 set pro = 'Y' where tracking_id = '" + resultado.numero + "'";
                                  
                                                                                                                    app.connection.query(query_update, function(err, rows_update, fields){

                                                                                                                       console.log(query_update);

                                                                                                                    });
                                                                                                                  }
                                                                                                                  
                                                                                                              });



                                                                                                            });
                                                                                                            //console.log(result[0].evento)
                                                                                                    


                                                                                                    });


               });

                    

                    
          });

        }
    };

    return IndexController;
};