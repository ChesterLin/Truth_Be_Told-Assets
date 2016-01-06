"use strict";

var SUMMONER_SPELL_PREFIX = "summoner_spell_";

// Children abilities
var _spellPanels = [];

function UpdateSpells() {
  var unit = Players.GetLocalPlayerPortraitUnit();
  var summonerSpells = [];
  
  for (var i = 0; i < Entities.GetAbilityCount(unit); i++) {
    var ability = Entities.GetAbility(unit, i);
    if (ability == -1)
      continue;
    
    var name = Abilities.GetAbilityName(ability);
    
    if (name.substr(0, SUMMONER_SPELL_PREFIX.length) === SUMMONER_SPELL_PREFIX)
      summonerSpells.push(ability);
  }

  var summonerListPanel = $("#summoner_spell_list");
  
  for (var i = 0; i < summonerSpells.length; i++) {
    // Add new panels if needed
    if (i >= _spellPanels.length) {
      var newPanel = $.CreatePanel("Panel", summonerListPanel, "summoner_spell_"+i);
      newPanel.BLoadLayout( "file://{resources}/layout/custom_game/summoner_spell_bar_ability.xml", false, false );
      _spellPanels.push(newPanel);
    }
    
    // Update the panel with this ability
    var spellPanel = _spellPanels[i];
    spellPanel.data().SetAbility(summonerSpells[i]);
  }
  
}

(function() {
	GameEvents.Subscribe( "dota_portrait_ability_layout_changed", UpdateSpells );
	GameEvents.Subscribe( "dota_player_update_selected_unit", UpdateSpells );
	GameEvents.Subscribe( "dota_player_update_query_unit", UpdateSpells );
	GameEvents.Subscribe( "dota_ability_changed", UpdateSpells );
	GameEvents.Subscribe( "dota_hero_ability_points_changed", UpdateSpells );
  
  UpdateSpells();
})();

