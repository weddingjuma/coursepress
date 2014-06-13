jQuery(document).ready(function() {

    jQuery('#add_student_class').live('input', function() {
        return false;
    });

    jQuery('.element_title').live('input', function() {
        jQuery(this).parent().parent().find('.h3-label-left').html(jQuery(this).val());
    });

    jQuery('#unit_name').live('input', function() {
        jQuery('.mp-wrap .mp-tab.active a').html(jQuery(this).val());
    });

    function submit_elements() {

        jQuery("input[name*='radio_input_module_radio_check']:checked").each(function() {
            var vl = jQuery(this).parent().find('.radio_answer').val();
            jQuery(this).closest(".module-content").find('.checked_index').val(vl);
        });

        jQuery("input[name*='radio_answers']").each(function(i, obj) {
            jQuery(this).attr("name", "radio_input_module_radio_answers[" + jQuery(this).closest(".module-content").find('.module_order').val() + '][]');
        });

        jQuery("input[name*='radio_check']").each(function(i, obj) {
            jQuery(this).attr("name", "radio_input_module_radio_check[" + jQuery(this).closest(".module-content").find('.module_order').val() + '][]');
        });

        jQuery("#unit-add").submit();
    }

    jQuery(".unit-control-buttons .save-unit-button").click(function() {
        submit_elements();
    });

    jQuery(".unit-control-buttons .button-publish").click(function() {
        submit_elements();
    });
});

function delete_class_confirmed() {
    return confirm(coursepress_units.delete_class);
}

function deleteClass() {
    if (delete_class_confirmed()) {
        return true;
    } else {
        return false;
    }
}

function withdraw_all_from_class_confirmed() {
    return confirm(coursepress_units.withdraw_class_alert);
}

function withdrawAllFromClass() {
    if (withdraw_all_from_class_confirmed()) {
        return true;
    } else {
        return false;
    }
}

jQuery(function() {

    jQuery("#sortable-units").sortable({
        placeholder: "ui-state-highlight",
        items: "li:not(.static)",
        stop: function(event, ui) {
            update_sortable_indexes();
        }
    });

    jQuery("#sortable-units").disableSelection();


    var current_unit_page = 0;//current selected unit page

    current_unit_page = jQuery('#unit-pages .ui-tabs-nav .ui-state-active a').html();

    jQuery("#unit-page-" + current_unit_page + " .unit-module-list").change(function() {
        jQuery("#unit-page-" + current_unit_page + " .module_description").html(jQuery(this).find(':selected').data('module-description'));
    });

    jQuery("#unit-page-" + current_unit_page + " .module_description").html(jQuery(this).find(':selected').data('module-description'));

});

function update_sortable_indexes() {
    jQuery('.numberCircle').each(function(i, obj) {
        jQuery(this).html(i + 1);
    });

    jQuery('.unit_order').each(function(i, obj) {
        jQuery(this).val(i + 1);
    });

    var positions = new Array();

    jQuery('.unit_id').each(function(i, obj) {
        positions[i] = jQuery(this).val();
    });

    var data = {
        action: 'update_units_positions',
        positions: positions.toString()
    };

    jQuery.post(ajaxurl, data, function(response) {
        //alert(response);
    });

}

/* Native WP media browser for audio module (unit module) */

jQuery(document).ready(function()
{
    jQuery('.audio_url_button').live('click', function()
    {
        var target_url_field = jQuery(this).prevAll(".audio_url:first");

        wp.media.editor.send.attachment = function(props, attachment)
        {
            jQuery(target_url_field).val(attachment.url);
        };
        wp.media.editor.open(this);
        return false;
    });
});

/* Native WP media browser for video module (unit module) */

jQuery(document).ready(function()
{
    jQuery('.video_url_button').live('click', function()
    {
        var target_url_field = jQuery(this).prevAll(".video_url:first");

        wp.media.editor.send.attachment = function(props, attachment)
        {
            jQuery(target_url_field).val(attachment.url);
        };

        wp.media.editor.open(this);
        return false;
    });

    jQuery('.course_video_url_button').live('click', function()
    {
        var target_url_field = jQuery(this).prevAll(".course_video_url:first");

        wp.media.string.props = function(props, attachment)
        {
            jQuery(target_url_field).val(props.url);
        }

        wp.media.editor.send.attachment = function(props, attachment)
        {
            jQuery(target_url_field).val(attachment.url);
        };

        wp.media.editor.open(this);
        return false;
    });

});

/* Native WP media browser for file module (for instructors) */

jQuery(document).ready(function()
{
    jQuery('.file_url_button').live('click', function()
    {

        var target_url_field = jQuery(this).prevAll(".file_url:first");
        wp.media.editor.send.attachment = function(props, attachment)
        {
            jQuery(target_url_field).val(attachment.url);
        };
        wp.media.editor.open(this);
        return false;
    });
});


jQuery(document).ready(function()
{
    jQuery('.insert-media-cp').live('click', function()
    {

        var rand_id = jQuery(this).attr("data-editor");

        wp.media.editor.send.attachment = function(props, attachment)
        {
            tinyMCE.execCommand('mceFocus', false, rand_id);
            var ed = tinyMCE.get(rand_id);
            var range = ed.selection.getRng();
            var image = ed.getDoc().createElement("img");

            var image_width = eval('attachment.sizes' + '.' + props.size + '.' + 'width');
            var image_height = eval('attachment.sizes' + '.' + props.size + '.' + 'height');

            image.setAttribute('class', 'align' + props.align + ' size-' + props.size + ' wp-image-' + rand_id);
            image.src = attachment.url;
            image.alt = attachment.alt;
            image.width = image_width;
            image.height = image_height;
            range.insertNode(image);
        };

        wp.media.editor.open(this);

        return false;
    });

    //tinyMCE.activeEditor.selection.moveToBookmark(bm);
});