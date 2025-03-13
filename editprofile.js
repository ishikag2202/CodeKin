$(document).ready(function () {
    let activeEditTypes = new Set();

    function expandForm() {
        $("form").addClass("active").show();
        $("#update-btn").show(); 
    }

    function createUsernameFields() {
        return `
            <div class="form-group username-edit" data-edit-type="username">
                <label for="old-username">Current Username</label>
                <input type="text" id="old-username" name="old-username" placeholder="Enter current username" required>
                
                <label for="new-username">New Username</label>
                <input type="text" id="new-username" name="new-username" placeholder="Enter new username" required>
            </div>
        `;
    }

    function createEmailFields() {
        return `
            <div class="form-group email-edit" data-edit-type="email">
                <label for="old-email">Current Email</label>
                <input type="email" id="old-email" name="old-email" placeholder="Enter current email" required>
                
                <label for="new-email">New Email</label>
                <input type="email" id="new-email" name="new-email" placeholder="Enter new email" required>
            </div>
        `;
    }

    function createPasswordFields() {
        return `
            <div class="form-group password-edit" data-edit-type="password">
                <label for="old-password">Current Password</label>
                <input type="password" id="old-password" name="old-password" placeholder="Enter current password" required>
                
                <label for="new-password">New Password</label>
                <input type="password" id="new-password" name="new-password" placeholder="Enter new password" required>
                
                <label for="confirm-password">Confirm New Password</label>
                <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm new password" required>
            </div>
        `;
    }

    $("#user_edit").on("click", function () {
        if (!activeEditTypes.has('username')) {
            expandForm();
            $("#edit-section").append(createUsernameFields());
            $(this).prop("disabled", true);
            activeEditTypes.add('username');
        }
    });

    $("#email_edit").on("click", function () {
        if (!activeEditTypes.has('email')) {
            expandForm();
            $("#edit-section").append(createEmailFields());
            $(this).prop("disabled", true);
            activeEditTypes.add('email');
        }
    });

    $("#pass_edit").on("click", function () {
        if (!activeEditTypes.has('password')) {
            expandForm();
            $("#edit-section").append(createPasswordFields());
            $(this).prop("disabled", true);
            activeEditTypes.add('password');
        }
    });

    $("#update-btn").on("click", function (event) {
        if (activeEditTypes.size === 0) {
            event.preventDefault();
            $("#alert-msg").text("There is nothing to update.").show();
            return;
        }

        // Validate each active edit type
        let isValid = true;
        activeEditTypes.forEach(function(editType) {
            const selector = `.form-group[data-edit-type="${editType}"]`;
            const inputs = $(selector + " input");
            
            // Check if all inputs are filled
            inputs.each(function() {
                if (!$(this).val().trim()) {
                    isValid = false;
                    return false;
                }
            });

            // Additional password validation
            if (editType === 'password') {
                const newPassword = $("#new-password").val();
                const confirmPassword = $("#confirm-password").val();
                
                if (newPassword !== confirmPassword) {
                    $("#alert-msg")
                        .text("New passwords do not match")
                        .show();
                    isValid = false;
                }

                if (newPassword.length < 8) {
                    $("#alert-msg")
                        .text("Password must be at least 8 characters long")
                        .show();
                    isValid = false;
                }
            }
        });

        if (!isValid) {
            event.preventDefault();
        }
    });

    $("#edit-section").on("input", "input[required]", function () {
        $("#alert-msg").hide();
    });
});