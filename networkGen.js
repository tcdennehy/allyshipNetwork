function genRandomGraph(num_nodes, num_links, groupProbs){
  nodes = d3.range(num_nodes).map(function(d){ return {r: 10, sex: ~~d3.randomUniform(2)(), group: assignGroup(groupProbs)}});
  links = getRandomSubarray(allPairs(nodes), num_links);

  arr = []

  for(i=0; i < links.length; i++){

    arr.push(links[i].source);
    arr.push(links[i].target);
  }

  empty_nodes = nodes.filter(function(d, i){
    for(n=0; n<arr.length; n++){
      if(arr && i==arr[n]){return false;}
    };
    return true;
  });

  for(n=0; n<empty_nodes.length; n++){
    while(true){
      target = ~~d3.randomUniform(num_nodes)();
      if(target!=n){
        break;
      }
    }
    links.push({source:empty_nodes[n], target:target, force: 0.1})
  }

  return {nodes: nodes, links: links}
}

function allPairs (nodes){ // generate every unique pair of nodes.
  pairArray = [];
  for(i=0; i < nodes.length; i++){
    for(j=i; j < nodes.length; j++){
      pairArray.push({source: i, target: j, force: 0.1});
    };
  };
  return pairArray;
}

function getRandomSubarray(arr, size) {
    var shuffled = arr.slice(0), i = arr.length, temp, index;
    while (i-- > 0) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, size);
}

function assignGroup(groupProbs){
  n = Math.random();
  keys = Object.keys(groupProbs);
  total_prob = 0;

  for(i=0;i < keys.length; i++){
    total_prob += groupProbs[keys[i]].prob;
    if(n <= total_prob){
      return groupProbs[keys[i]].info;
    }
  }
}

function simStep(data){
  data.nodes
}
