function ExperienceView(id) {
  this.experience = getExperienceByID(id)
  this.assets = this.experience.assets
  this.experienceTitle = this.experience.title
  this.assetCount = this.experience.assets.length
  this.panels = []
  this.assetsPaneled = 0
  this.layoutLookup = {
    "titleCaption": 1,
    "loadSingleImage": 1,
    "loadTwoImages": 2,
    "masonify": "User input",
  }
}

ExperienceView.prototype.loadAssets = function(_arrayOfLayouts) {

  var arrayOfLayouts = _arrayOfLayouts
  var assetCount = this.assetCount
  var assetsPaneled = this.assetsPaneled
  var layoutLookup = this.layoutLookup
  var assets = this.assets
  var panels = this.panels

  if (arrayOfLayouts) {
    // Take first layout
    arrayOfLayouts.forEach(function(layoutOption) {
      if (layoutOption.constructor == String) {
        var numAssets = layoutLookup[layoutOption]
        var assetSlice = assets.slice(assetsPaneled, assetsPaneled + numAssets)
        var panel = new PanelView(assetSlice)
        var loadedPanel = eval("panel." + layoutOption + "()")
      } else if (layoutOption.constructor == Array) {
        var numAssets = layoutOption[1]
        var method = layoutOption[0]
        var assetSlice = assets.slice(assetsPaneled, assetsPaneled + numAssets)
        var panel = new PanelView(assetSlice)
        var loadedPanel = eval("panel." + method + "(" + numAssets + ")")
      }
      if (assetSlice.length > 0) {
        panels.push(loadedPanel)
        assetsPaneled += numAssets
      }
    })
  } else {
    assetsPaneled += assetCount
    assets.forEach(function(asset) {
      var panel = new PanelView([asset])
      panels.push(panel.loadSingleImage())
    })
  }
  if (assetsPaneled < assetCount) {
    this.loadRemainingAssets(assetsPaneled)
  }
  return panels
}

ExperienceView.prototype.loadRemainingAssets = function(startingIndex) {
  var assetsPaneled = this.assetsPaneled
  var assetCount = this.assetCount
  var assetsPaneled = this.assetsPaneled
  var assets = this.assets
  var panels = this.panels

  var assetsIndex = startingIndex
  while (assetsIndex < assetCount) {
    var panel = new PanelView([assets[assetsIndex]])
    panels.push(panel.loadSingleImage())
    assetsIndex += 1
  }
}


ExperienceView.prototype.render = function() {
  removePanelNavigation()
  // For testing a predefined set of routes
  // this.loadAssets(["loadSingleImage", "loadTwoImages"])
  this.loadAssets([
    "titleCaption",
    "loadSingleImage",
    ["masonify", 8],
    ["masonify",12],
    "loadTwoImages"])

  // this.loadAssets()

  // Iterate through each panel in the panel array and append to fullpage
  this.panels.forEach(function(panel) {
    $('#fullpage').append(panel)
  })
  applyFullpage()
}

//this is a helper for if you want to get the asset's EXPERIENCE description
var getExperienceDescription = function(experienceID){
  var experienceObject = $.grep(EXPERIENCES, function(e){ return e.id == experienceID; });
  return experienceObject[0].description
}


