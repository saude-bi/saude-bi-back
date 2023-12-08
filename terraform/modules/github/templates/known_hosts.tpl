%{ for k in known_hosts ~}
${ k }
%{ endfor ~}