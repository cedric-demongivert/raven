Operator = _ operator:UnionOperator _ { return operator } 
    
UnionOperator = head:DepthOperator tail:(_ "," _ DepthOperator)* {
      const operators = [head]

      for (const element of tail) {
            operators.push(element[3])
      }

      return operators.length === 1 ? operators[0] : RavenOperator.union(operators);
    }

DepthOperator = head:IntersectionOperator tail:(_ IntersectionOperator)* {
      const operators = [head]

      for (const element of tail) {
            operators.push(element[1])
      }

      return operators.length === 1 ? operators[0] : RavenNodeOperators.depth(operators);
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