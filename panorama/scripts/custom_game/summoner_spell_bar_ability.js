"use strict";

var _ability = -1;

function SetAbility(ability) {
  _ability = ability;
  var name = Abilities.GetAbilityName(_ability);
  
  var abilityImage = $("#AbilityImage");
  abilityImage.abilityname = name;
}

(function() {
  $.GetContextPanel().data().SetAbility = SetAbility;
})();