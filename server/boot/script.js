

module.exports = function(app) {
    var User = app.models.User;
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;

    User.create([
        {username: 'admin', email: 'admin@gmail.com', password: 'admin'},
        {username: 'super_admin', email: 'super_admin@gmail.com', password: 'super_admin'}
    ], function(err, users) {
        if (err) throw err;
        //...
        // Create projects, assign project owners and project team members
        //...
        // Create the admin role
        Role.create({
            name: 'admin'
        }, function(err, role) {
            if (err) throw err;

            // Make Bob an admin
            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[0].id
            }, function(err, principal) {
                if (err) throw err;
                console.log(principal);
            });
        });

        Role.create({
            name: 'super_admin'
        }, function(err, role) {
            if (err) throw err;

            // Make Bob an admin
            role.principals.create({
                principalType: RoleMapping.USER,
                principalId: users[1].id
            }, function(err, principal) {
                if (err) throw err;
                console.log(principal);
            });
        });
    });


};