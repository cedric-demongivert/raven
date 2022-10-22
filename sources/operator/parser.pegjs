Operator = _ operator:UnionOperator _ { return operator } 
    
UnionOperator = head:DepthOperator tail:(_ "," _ DepthOperator)* {
      const operators = [head]

      for (let index = 3; index < tail.length; index += 4) {
            operators.push(tail[index])
      }

      return operators.length === 1 ? operators[0] : RavenOperator.union(operators);
    }

DepthOperator = head:IntersectionOperator tail:(_ IntersectionOperator)* {
      const operators = [head]

      for (let index = 1; index < tail.length; index += 2) {
            operators.push(tail[index])
      }

      return operators.length === 1 ? operators[0] : RavenDataOperators.depth(operators);
}
    
IntersectionOperator = operators:(AtomicOperator)+ {
      return RavenOperator.intersection(operators);
}
    
AtomicOperator = ClassOperator /
		     IdentifierOperator /
                 AnythingOperator /
                 TagOperator 

AnythingOperator = "*" { return RavenOperator.identity(); }
ClassOperator = "." identifier:Identifier { return RavenDataOperators.clazz(identifier); }
IdentifierOperator = "#" identifier:Identifier { return RavenDataOperators.identifier(identifier); }
TagOperator = identifier:Identifier { return RavenDataOperators.tag(identifier); }

Identifier = [^ \t\n\r.#]+ { return text(); }

_ = [ \t\n\r]*