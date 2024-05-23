const staticURL = "apriantoa917.github.io"

/* TOASTR CONFIGURATION
 * function : set property for toastr library (view & functionality)
 * accessed from : this file
 * accessed when : page loaded & included
 */
toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-top-center",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "700",
    "hideDuration": "1000",
    "timeOut": "7000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

/*
 * function : initialization data of project portfolio
 * params : js object (list of project portfolios) data.js
 * accessed from : document ready on index.html
 * accessed when : page loaded
 */
function initProjectData(data) {
    // after page reload -> reload all project data from js data file
    data.forEach(function(project, index) {
        const template = `<div class="col project-card ` + project.techStack + `">
            <div class="card h-100 card-focus" onclick="openModalProjectByIndex('` + index + `')">
                <div class="card-body">
                    <h5 class="card-title"> ` + project.title + ` (` + project.year + `) 
                    </h5>
                    <center><img src="` + project.thumbnail + `" alt="" loading="lazy"></center>
                    <p class="card-text">` + project.overview + `</p>
                </div>
            </div>
        </div>`
        $("#listProject").append(template)
    });
}

/*
 * >>>>>>>>>>> PROJECT SECTION
 */

/*
 * function : filtering shown project portfolio data by its stack
 * params : projectStack -> tech stack on data.js
 * accessed from : button filter project stack (project portfolio section, index.html)
 * accessed when : user click button project stack to filter tech stack of project
 */
function filterProjectType(projectStack) {
    container = $(".project-card")
    if (projectStack === "all") {
        container.show()
    } else {
        container.hide()
        container.filter('.' + projectStack).show()
    }
    $(".button-tech-stack").removeClass("active")
    $(".button-group-tech-stack .button-" + projectStack).addClass("active")

}

// parsing project id on url hash (#) to open modal by it's index
function getProjectIndexById(projectId) {
    var index = 0
    var found = false
    for (var i = 0; i < data.length; i++) {
        // Check if the child value matches the search value
        if (data[i].projectId === projectId) {
            // If a match is found, return the index of the element
            index = i
            found = true
            break;
        }
    }
    // if item found -> return it index, else -> return 999 to inform project not found
    if (!found) {
        index = 999
    }
    return index
}

/*
 * >>>>>>>>>>> PROJECT MODAL
 */

/*
 * function : show modal of project detail by its index (data.js data index)
 * params : index (position of the data)
 * accessed from : 
 *      1. index.html -> document ready | after parse url include params project id or not
 *      2. this file -> initProjectData(data)
 * accessed when : 
 *      1. url have params project id
 *      2. user click project card to see details
 */
function openModalProjectByIndex(index) {
    var project = data[index]
    $("#modalProject-projectTitle").html(project.title + " (" + project.year + ")")
    $("#modalProject-projectOverview").html(project.overview)
    $("#modalProject-projectTech").html(project.tech)
    $("#modalProject-projectRole").html(project.roles)
    $("#modalProject-projectSneakPeak").html(project.sneakPeak)
    $("#modalProject-projectImage").empty()
    $("#modalProject-projectId").html(project.projectId)
    project.image.forEach(function(image, index) {
        var isActive = (index === 0) ? "active" : "";
        const imageTemplate = `<div class="carousel-item ` +
            isActive + `"> <img class="img-project" src="` + image + `" class="d-block w-100" alt="..." onclick="zoomImage('` + image + `')"> </div>`
        $("#modalProject-projectImage").append(imageTemplate)
    });
    if (project.image.length === 1) {
        $(".carousel-control-prev").addClass("d-none");
        $(".carousel-control-next").addClass("d-none");
    } else {
        $(".carousel-control-prev").removeClass("d-none");
        $(".carousel-control-next").removeClass("d-none");
    }
    $('#modalProject').modal('show');
}

/*
 * function : open full size image on new tab
 * params : image url
 * accessed from : openModalProjectByIndex(index)
 * accessed when : user click selected image area
 */
function zoomImage(url) {
    window.open(url, '_blank').focus();
}

/*
 * function : copying URL from current opened project data
 * accessed from : modal project detail (index.html)
 * accessed when : user click share button on opened modal project detail
 */
function copyProjectURL() {
    var projectId = $("#modalProject-projectId").text()
    var url = staticURL + "?project=" + projectId
    navigator.clipboard.writeText(url);
    toastr["success"]("Link copied. Paste anywhere to open link")
}

/*
 * >>>>>>>>>>> ACCESSIBILITY
 */

/*
 * function : bring focus to top page
 * accessed from : index.html
 * accessed when : user click scroll to top button
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}